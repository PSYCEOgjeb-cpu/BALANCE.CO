#!/usr/bin/env python3
"""
사주 명리학 학습 앱을 위한 간단한 로컬 HTTP 서버
PWA 기능 테스트를 위해 HTTPS 및 필요한 헤더를 제공합니다.
"""

import http.server
import socketserver
import ssl
import os
import mimetypes
import json
from urllib.parse import urlparse, parse_qs

class SajuHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """사주 학습 앱을 위한 커스텀 HTTP 핸들러"""
    
    def end_headers(self):
        # PWA 및 보안 헤더 추가
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        
        # CORS 헤더 (개발용)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        
        # PWA 관련 헤더
        if self.path.endswith('.js') and 'service-worker' in self.path:
            self.send_header('Service-Worker-Allowed', '/')
            
        super().end_headers()
    
    def do_GET(self):
        """GET 요청 처리"""
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # 루트 경로를 index.html로 리다이렉트
        if path == '/':
            path = '/index.html'
            
        # 파일 확장자에 따른 MIME 타입 설정
        if path.endswith('.json'):
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            try:
                with open(path.lstrip('/'), 'r', encoding='utf-8') as f:
                    self.wfile.write(f.read().encode('utf-8'))
            except FileNotFoundError:
                self.send_error(404)
            return
            
        # 기본 파일 서빙
        self.path = path
        return super().do_GET()
    
    def do_OPTIONS(self):
        """CORS preflight 처리"""
        self.send_response(200)
        self.end_headers()
    
    def log_message(self, format, *args):
        """로그 메시지 포맷"""
        print(f"📱 {self.address_string()} - {format % args}")

def create_placeholder_icon(size, filename):
    """SVG를 이용한 플레이스홀더 아이콘 생성"""
    svg_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg width="{size}" height="{size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1e40af;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
        </linearGradient>
    </defs>
    <rect width="{size}" height="{size}" rx="20%" fill="url(#grad1)"/>
    <text x="50%" y="40%" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="{size//4}" font-weight="bold">사주</text>
    <text x="50%" y="65%" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="{size//6}">학습</text>
</svg>'''
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(svg_content)

def setup_icons():
    """필요한 아이콘 파일들 생성"""
    icon_sizes = [
        (16, 'icons/icon-16x16.png'),
        (32, 'icons/icon-32x32.png'), 
        (72, 'icons/icon-72x72.png'),
        (96, 'icons/icon-96x96.png'),
        (120, 'icons/icon-120x120.png'),
        (128, 'icons/icon-128x128.png'),
        (144, 'icons/icon-144x144.png'),
        (152, 'icons/icon-152x152.png'),
        (180, 'icons/icon-180x180.png'),
        (192, 'icons/icon-192x192.png'),
        (384, 'icons/icon-384x384.png'),
        (512, 'icons/icon-512x512.png')
    ]
    
    print("🎨 아이콘 파일 생성 중...")
    os.makedirs('icons', exist_ok=True)
    
    for size, filename in icon_sizes:
        # SVG로 아이콘 생성 (PNG 대신)
        svg_filename = filename.replace('.png', '.svg')
        create_placeholder_icon(size, svg_filename)
        
        # manifest.json에서는 SVG 참조하도록 변경 필요
    
    print(f"✅ {len(icon_sizes)}개 아이콘 파일 생성 완료")

def start_server(port=8000, use_https=False):
    """HTTP/HTTPS 서버 시작"""
    
    # 아이콘 파일 생성
    setup_icons()
    
    # 서버 설정
    handler = SajuHTTPRequestHandler
    
    with socketserver.TCPServer(("", port), handler) as httpd:
        protocol = "HTTPS" if use_https else "HTTP"
        print(f"\n🚀 사주 명리학 학습 앱 서버 시작")
        print(f"📡 프로토콜: {protocol}")
        print(f"🌐 주소: http://localhost:{port}")
        print(f"📱 PWA 테스트 가능: {'✅' if not use_https else '🔒'}")
        print(f"\n💡 브라우저에서 http://localhost:{port} 접속하세요")
        print("🛑 서버 종료: Ctrl+C\n")
        
        if use_https:
            # 개발용 자체 서명 인증서 (실제 배포시에는 정식 인증서 사용)
            context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
            context.check_hostname = False
            context.verify_mode = ssl.CERT_NONE
            httpd.socket = context.wrap_socket(httpd.socket, server_side=True)
            print("🔒 HTTPS 모드로 실행 중 (자체 서명 인증서)")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 서버를 종료합니다...")
            httpd.shutdown()

if __name__ == "__main__":
    import sys
    
    # 명령행 인자 처리
    port = 8000
    use_https = False
    
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("❌ 포트 번호가 올바르지 않습니다. 기본값 8000 사용")
    
    if len(sys.argv) > 2 and sys.argv[2].lower() in ['https', 'ssl', 'true']:
        use_https = True
    
    start_server(port, use_https)
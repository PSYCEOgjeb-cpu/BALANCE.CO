// 이미지 생성 API - 무료 버전에서는 지원되지 않으므로 빈 응답 반환
// 사이트 에러를 막기 위한 안전장치

exports.handler = async function(event, context) {
  // POST 요청만 받음
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // 무료 API 키로는 이미지 생성이 원활하지 않아 
  // 사이트 에러를 막기 위해 "이미지 없음" 신호를 보냅니다.
  return {
    statusCode: 200,
    body: JSON.stringify({ 
      predictions: [] // 빈 배열을 보내면 프론트엔드에서 이미지를 안 보여주고 넘어갑니다.
    })
  };
};

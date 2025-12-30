exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body);
    const userPrompt = body.prompt || "안녕하세요";
    const systemInstruction = body.systemInstruction || "";
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, body: JSON.stringify({ error: "API Key가 없습니다." }) };
    }

    // ★ gemini-1.5-flash - 무료 티어에서 가장 안정적 (분당 15회, 일 1500회)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ 
          parts: [{ text: systemInstruction + "\n\n" + userPrompt }] 
        }],
        generationConfig: {
          maxOutputTokens: 1500,
          temperature: 0.8
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data);
      // 429 에러 시 더 친절한 메시지
      if (response.status === 429) {
        return { 
          statusCode: 429, 
          body: JSON.stringify({ error: "API 사용량 한도 초과. 새 API 키가 필요합니다." }) 
        };
      }
      return { statusCode: response.status, body: JSON.stringify(data) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error("Server Error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};

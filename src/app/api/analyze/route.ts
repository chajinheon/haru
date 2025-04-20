import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const inputText = body.text;

    // 여기에 실제 키워드 분류 및 문장 분석 로직 추가 (예: 외부 API 호출)
    console.log('Received text for analysis:', inputText);

    // 임시 응답
    const analysisResult = {
      keywords: ['임시', '키워드'],
      sentiment: 'neutral',
      summary: `분석된 텍스트: ${inputText?.substring(0, 50)}...`,
    };

    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error('Analysis API error:', error);
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
} 
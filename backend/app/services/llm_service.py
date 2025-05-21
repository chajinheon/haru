from typing import Dict, Any
import asyncio
import logging
from openai import OpenAI, APIConnectionError, RateLimitError, APIStatusError
from ..core.config import OPENAI_API_KEY # Direct import of the key for simplicity here

client: OpenAI | None = None
if OPENAI_API_KEY:
    client = OpenAI(api_key=OPENAI_API_KEY)
else:
    logging.warning("OPENAI_API_KEY가 설정되지 않았습니다. LLM 서비스는 mock 응답을 반환합니다.")

async def generate_daily_summary(user_data: Dict[str, Any]) -> str:
    if not client:
        # Simulate LLM call with a delay
        await asyncio.sleep(1) 
        # Mock response
        summary = f"오늘의 활동 요약 (Mock): {user_data.get('name', '사용자')}님, 오늘 하루도 수고하셨습니다! "
        if user_data.get('completed_todos_count', 0) > 0:
            summary += f"총 {user_data['completed_todos_count']}개의 할 일을 완료하셨네요. "
        if user_data.get('journal_entry_count', 0) > 0:
            summary += "오늘 일지를 작성하며 하루를 돌아보는 시간을 가지셨군요. "
        summary += "내일도 멋진 하루 보내세요!"
        return summary

    # If client is available, proceed with actual API call
    prompt_messages = [
        {"role": "system", "content": "당신은 사용자의 하루 활동을 격려하고 간단한 조언을 해주는 AI 코치 '루미'입니다. 항상 친절하고 긍정적인 말투를 사용해주세요."},
        {"role": "user", "content": f"""다음 정보를 바탕으로 사용자에게 오늘의 요약 코멘트를 작성해주세요. 코멘트는 2-3문장으로 간결하게 작성해주세요.
        - 사용자 이름: {user_data.get('name', '사용자')}
        - 오늘 완료한 할 일 개수: {user_data.get('completed_todos_count', 0)}
        - 오늘 작성한 일지 개수: {user_data.get('journal_entry_count', 0)}"""}
    ]

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=prompt_messages,
            max_tokens=150, # 응답 길이 제한
            temperature=0.7 # 창의성 조절
        )
        return response.choices[0].message.content.strip()
    except APIConnectionError as e:
        logging.error(f"OpenAI API 연결 오류: {e}")
        return "AI 서버 연결에 실패했어요. 잠시 후 다시 시도해주세요."
    except RateLimitError as e:
        logging.error(f"OpenAI API 요청 한도 초과: {e}")
        return "AI 서비스 사용량이 많아 잠시 응답할 수 없어요. 조금 뒤에 다시 요청해주세요."
    except APIStatusError as e:
        logging.error(f"OpenAI API 상태 오류: {e.status_code} - {e.response}")
        return "AI 서비스에 문제가 발생했어요. 관리자에게 문의해주세요."
    except Exception as e:
        logging.error(f"OpenAI API 호출 중 알 수 없는 오류: {e}")
        return "AI 코멘트 생성 중 알 수 없는 오류가 발생했어요."

"""
데이터 수집 스케줄러
주기적으로 데이터를 수집하는 스크립트
"""
import schedule
import time
from collect_stocks import main as collect_stocks
from collect_prices import main as collect_prices
import config

def run_scheduler():
    """스케줄러 실행"""
    print("데이터 수집 스케줄러 시작...")
    
    # 매일 오전 9시에 종목 리스트 업데이트
    schedule.every().day.at("09:00").do(collect_stocks)
    
    # 매일 장 마감 후 오후 4시에 시세 데이터 수집
    schedule.every().day.at("16:00").do(collect_prices)
    
    # 설정된 주기마다 시세 데이터 수집 (기본 60분)
    schedule.every(config.COLLECT_INTERVAL).minutes.do(collect_prices)
    
    print(f"스케줄 설정 완료:")
    print(f"  - 종목 리스트: 매일 09:00")
    print(f"  - 시세 데이터: 매일 16:00 및 {config.COLLECT_INTERVAL}분마다")
    
    # 스케줄 실행
    while True:
        schedule.run_pending()
        time.sleep(60)  # 1분마다 체크

if __name__ == '__main__':
    try:
        run_scheduler()
    except KeyboardInterrupt:
        print("\n스케줄러 종료")



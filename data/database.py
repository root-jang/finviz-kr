"""
데이터베이스 관리 모듈
SQLite를 사용하여 주식 데이터를 저장
"""
import sqlite3
import os
from datetime import datetime
from typing import List, Dict, Optional
import config

class StockDatabase:
    """주식 데이터베이스 관리 클래스"""
    
    def __init__(self, db_path: str = None):
        """
        데이터베이스 초기화
        
        Args:
            db_path: 데이터베이스 파일 경로 (기본값: config.DB_PATH)
        """
        self.db_path = db_path or config.DB_PATH
        # 데이터베이스 디렉토리가 없으면 생성
        os.makedirs(os.path.dirname(self.db_path) if os.path.dirname(self.db_path) else '.', exist_ok=True)
        self._init_database()
    
    def _get_connection(self):
        """데이터베이스 연결 생성"""
        return sqlite3.connect(self.db_path)
    
    def _init_database(self):
        """데이터베이스 테이블 초기화"""
        conn = self._get_connection()
        cursor = conn.cursor()
        
        # 종목 정보 테이블
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS stocks (
                code TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                market TEXT NOT NULL,
                sector TEXT,
                market_cap INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # 시세 데이터 테이블
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS prices (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                code TEXT NOT NULL,
                date DATE NOT NULL,
                open_price REAL,
                high_price REAL,
                low_price REAL,
                close_price REAL,
                volume INTEGER,
                change_rate REAL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(code, date)
            )
        ''')
        
        # 재무정보 테이블
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS financials (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                code TEXT NOT NULL,
                year INTEGER NOT NULL,
                quarter INTEGER,
                revenue INTEGER,
                operating_profit INTEGER,
                net_profit INTEGER,
                total_assets INTEGER,
                total_equity INTEGER,
                per REAL,
                pbr REAL,
                roe REAL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(code, year, quarter)
            )
        ''')
        
        # 인덱스 생성
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_prices_code_date ON prices(code, date)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_financials_code_year ON financials(code, year)')
        
        conn.commit()
        conn.close()
    
    def insert_stock(self, code: str, name: str, market: str, sector: str = None, market_cap: int = None):
        """
        종목 정보 삽입 또는 업데이트
        
        Args:
            code: 종목 코드
            name: 종목명
            market: 시장 구분 (KOSPI, KOSDAQ)
            sector: 섹터
            market_cap: 시가총액
        """
        conn = self._get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT OR REPLACE INTO stocks (code, name, market, sector, market_cap, updated_at)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (code, name, market, sector, market_cap, datetime.now()))
        
        conn.commit()
        conn.close()
    
    def insert_price(self, code: str, date: str, open_price: float, high_price: float, 
                     low_price: float, close_price: float, volume: int, change_rate: float = None):
        """
        시세 데이터 삽입
        
        Args:
            code: 종목 코드
            date: 날짜 (YYYY-MM-DD)
            open_price: 시가
            high_price: 고가
            low_price: 저가
            close_price: 종가
            volume: 거래량
            change_rate: 등락률
        """
        conn = self._get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT OR REPLACE INTO prices 
            (code, date, open_price, high_price, low_price, close_price, volume, change_rate)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (code, date, open_price, high_price, low_price, close_price, volume, change_rate))
        
        conn.commit()
        conn.close()
    
    def get_stocks(self, market: str = None) -> List[Dict]:
        """
        종목 리스트 조회
        
        Args:
            market: 시장 구분 (None이면 전체)
        
        Returns:
            종목 정보 리스트
        """
        conn = self._get_connection()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        if market:
            cursor.execute('SELECT * FROM stocks WHERE market = ? ORDER BY market_cap DESC', (market,))
        else:
            cursor.execute('SELECT * FROM stocks ORDER BY market_cap DESC')
        
        rows = cursor.fetchall()
        conn.close()
        
        return [dict(row) for row in rows]
    
    def get_latest_price(self, code: str) -> Optional[Dict]:
        """
        최신 시세 조회
        
        Args:
            code: 종목 코드
        
        Returns:
            최신 시세 정보
        """
        conn = self._get_connection()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT * FROM prices 
            WHERE code = ? 
            ORDER BY date DESC 
            LIMIT 1
        ''', (code,))
        
        row = cursor.fetchone()
        conn.close()
        
        return dict(row) if row else None



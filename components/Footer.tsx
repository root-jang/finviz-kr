/**
 * 푸터 컴포넌트
 * 사이트 하단 정보 표시
 */
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 회사 정보 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">FinViz KR</h3>
            <p className="text-gray-400 text-sm">
              국내 증시 분석 플랫폼
              <br />
              코스피, 코스닥 주요 종목 및 ETF 정보 제공
            </p>
          </div>

          {/* 링크 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">빠른 링크</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/stocks" className="text-gray-400 hover:text-white">
                  종목 리스트
                </a>
              </li>
              <li>
                <a href="/screener" className="text-gray-400 hover:text-white">
                  스크리너
                </a>
              </li>
              <li>
                <a href="/heatmap" className="text-gray-400 hover:text-white">
                  시장 지도
                </a>
              </li>
              <li>
                <a href="/etf" className="text-gray-400 hover:text-white">
                  ETF
                </a>
              </li>
            </ul>
          </div>

          {/* 법적 고지 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">법적 고지</h3>
            <p className="text-gray-400 text-sm">
              본 사이트는 정보 제공 목적으로만 사용됩니다.
              <br />
              투자 결정은 신중히 하시기 바랍니다.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 FinViz KR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}



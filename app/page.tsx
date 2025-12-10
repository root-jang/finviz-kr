import Link from 'next/link'

/**
 * 메인 홈 페이지
 * 주요 기능 소개 및 빠른 접근 링크 제공
 */
export default function Home() {
  const features = [
    {
      title: '종목 리스트',
      description: '코스피, 코스닥 주요 종목 정보를 한눈에 확인',
      href: '/stocks',
      icon: '📊',
    },
    {
      title: '스크리너',
      description: '조건에 맞는 종목을 빠르게 검색',
      href: '/screener',
      icon: '🔍',
    },
    {
      title: '시장 지도',
      description: '섹터별 주가 흐름을 시각적으로 확인',
      href: '/heatmap',
      icon: '🗺️',
    },
    {
      title: 'ETF',
      description: '주요 ETF 정보 및 수익률 확인',
      href: '/etf',
      icon: '📈',
    },
  ]

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* 히어로 섹션 */}
        <div className="text-center mb-12 mt-4 sm:mt-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            ZZang 그노의 똥
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-2">
            국내 증시 분석 플랫폼
          </p>
          <p className="text-base sm:text-lg text-gray-500 px-4">
            코스피, 코스닥 주요 종목 및 ETF 정보를 제공하는 주식 분석 플랫폼
          </p>
        </div>

        {/* 주요 기능 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900">
                {feature.title}
              </h2>
              <p className="text-gray-600">{feature.description}</p>
            </Link>
          ))}
        </div>

        {/* 시장 요약 (추후 구현) */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">시장 요약</h2>
          <p className="text-gray-600">
            코스피, 코스닥 지수 및 주요 지표 (추후 구현 예정)
          </p>
        </div>
      </div>
    </div>
  )
}


// data.ts - 01문서로 추출된 데이터
import { CelebProfile, MatchPoint, ContentIdea } from './types';

// ⚠️ 아래 모든 값은 01. data-extract.md 프롬프트로 보고서에서 추출해야 합니다.
// 예시 데이터가 아닌, 실제 보고서 내용으로 채워주세요.

export const celebData: CelebProfile = {
  name: "셀럽명",           // Profile Meta에서 추출
  handle: "@celeb_handle",         // Profile Meta에서 추출
  platform: "youtube",  // 또는 "youtube" - Profile Meta에서 추출
  profileUrl: "https://youtube.com/@celeb_handle",     // Profile Meta에서 추출
  category: "푸드",  // "일반" | "뷰티" | "푸드" - Profile Meta에서 추출
  tagline: "셀럽의 채널 컨셉을 한 문장으로 설명하는 태그라인입니다.",        // 채널 한줄 설명
  identity: ["핵심 키워드 1", "핵심 키워드 2", "핵심 키워드 3"],       // 핵심 아이덴티티 3개
  dna: [
    // 라벨 고정, 값만 보고서 분석하여 배정 (0-100)
    { label: "논리적 설득", value: 85 },
    { label: "문제 해결", value: 72 },
    { label: "팬덤 신뢰", value: 90 },
    { label: "정보성", value: 78 },
    { label: "심미성", value: 65 }
  ]
};

export const matchScore = {
  score: 92,           // 매칭 점수 숫자
  summary: "브랜드 철학과 셀럽 페르소나의 높은 일치도"         // 점수 설명문
};

export const productDefinition = {
  headline: "이 제품은 단순한 식품이 아니라",       // 핵심 문장
  highlight: "라이프스타일의 재정의",      // 강조 단어
  description: "제품의 본질은 단순한 기능을 넘어, 소비자의 일상에 가치를 더하는 것입니다. 우리는 '건강한 선택'이라는 메시지를 통해 브랜드의 철학을 전달합니다.",    // 본질 설명
  quote: "진정한 가치는 제품 그 자체가 아니라, 그것이 만들어내는 경험과 연결에 있습니다.",          // 인용문
  keyConcepts: [
    {
      icon: "Scale",
      title: "균형 잡힌 접근",
      description: "건강과 맛, 두 가지 가치를 동시에 충족시키는 제품 철학",
      theme: 'green' as const
    },
    {
      icon: "Puzzle",
      title: "라이프스타일 통합",
      description: "일상의 모든 순간에 자연스럽게 녹아드는 사용 경험 설계",
      theme: 'blue' as const
    },
    {
      icon: "HeartHandshake",
      title: "신뢰 기반 관계",
      description: "투명한 원재료 공개와 지속적인 품질 개선으로 쌓는 신뢰",
      theme: 'pink' as const
    }
  ]
};

export const matchPoints: MatchPoint[] = [
  // Core(isCore: true) 3개 고정 + Sub(isCore: false) N개 유동적
  {
    id: 1,
    feature: "프리미엄 원재료",
    connection: "품질 중시 콘텐츠",
    title: "'좋은 재료'에 대한 공통된 가치관",
    logic: "셀럽은 콘텐츠에서 항상 '재료의 품질'을 강조합니다. 제품의 '프리미엄 원재료' 메시지와 '자연스럽게 연결'되어 시청자에게 진정성 있는 메시지를 전달할 수 있습니다.",
    isCore: true
  },
  {
    id: 2,
    feature: "간편한 활용성",
    connection: "실용주의 철학",
    title: "'바쁜 일상 속 건강한 선택'이라는 내러티브",
    logic: "셀럽의 콘텐츠는 '효율적이고 실용적인' 라이프스타일을 지향합니다. 제품의 '간편한 활용성'은 이러한 가치관과 '완벽하게 부합'합니다.",
    isCore: true
  },
  {
    id: 3,
    feature: "브랜드 스토리",
    connection: "서사 중심 콘텐츠",
    title: "'이야기가 있는 제품'에 대한 선호",
    logic: "셀럽은 단순 리뷰가 아닌 '스토리텔링' 방식으로 콘텐츠를 구성합니다. 브랜드의 창업 스토리와 철학은 '풍부한 콘텐츠 소재'가 됩니다.",
    isCore: true
  },
  {
    id: 4,
    feature: "가격 대비 가치",
    connection: "합리적 소비",
    title: "가성비를 넘어선 '가심비' 메시지",
    logic: "시청자들은 합리적인 소비를 중시하면서도 품질에 대한 기대를 놓지 않습니다. 제품의 가격 정책은 이러한 니즈에 적합합니다.",
    isCore: false
  },
  {
    id: 5,
    feature: "지속 가능성",
    connection: "환경 의식",
    title: "친환경 패키징에 대한 공감대",
    logic: "셀럽은 최근 환경 이슈에 대한 관심을 보이고 있습니다. 브랜드의 지속가능한 패키징 전략은 긍정적인 반응을 이끌어낼 수 있습니다.",
    isCore: false
  }
];

export const contentIdeas: ContentIdea[] = [
  // N개 유동적 (theme: green→blue→pink 순환)
  {
    id: "content-1",
    title: "일주일 챌린지: 매일 아침 건강한 시작",
    subTitle: "루틴 콘텐츠",
    tags: ["챌린지", "모닝루틴", "건강"],
    concept: "7일간의 아침 식사 루틴을 제품과 함께 기록",
    flow: [
      "Day 1-2: '새로운 아침 습관' 도입 - 제품 첫 개봉과 기대감 연출",
      "Day 3-4: '변화의 시작' - 체감되는 작은 변화들 공유",
      "Day 5-6: '루틴 정착' - 자연스러운 일상 속 제품 활용",
      "Day 7: '완주 후기' - 전후 비교와 솔직한 평가"
    ],
    rationale: "셀럽의 기존 콘텐츠 중 '루틴 시리즈'가 높은 조회수를 기록했습니다. 이 포맷은 시청자 참여를 유도하고 '제품의 지속적 노출'을 자연스럽게 만듭니다.",
    synergy: "7일간의 여정은 '단순 광고'를 넘어 '진정성 있는 체험기'로 인식됩니다. 시청자들의 댓글 참여와 '따라하기' 콘텐츠 생성이 기대됩니다.",
    theme: 'green'
  },
  {
    id: "content-2",
    title: "브랜드 창업자와의 대화",
    subTitle: "인터뷰 콘텐츠",
    tags: ["비하인드", "인터뷰", "브랜드스토리"],
    concept: "브랜드 창업자를 만나 철학과 비전을 듣는 심층 인터뷰",
    flow: [
      "도입: 셀럽의 제품 첫 경험담과 궁금증 제시",
      "전개 1: 창업 스토리 - '왜 이 제품을 만들게 되었나'",
      "전개 2: 제품 철학 - '다른 제품과 무엇이 다른가'",
      "마무리: 앞으로의 비전과 시청자에게 전하는 메시지"
    ],
    rationale: "인터뷰 형식은 셀럽의 '탐구자' 페르소나와 잘 맞습니다. 시청자들은 '제품 뒤의 사람'을 알게 되면서 브랜드에 대한 '감정적 연결'을 형성합니다.",
    synergy: "브랜드 스토리의 깊이 있는 전달은 '단순 PPL'과 차별화됩니다. 창업자의 진정성이 셀럽을 통해 전달되어 '신뢰도 상승'이 기대됩니다.",
    theme: 'blue'
  },
  {
    id: "content-3",
    title: "시청자 참여 레시피 대결",
    subTitle: "참여형 콘텐츠",
    tags: ["참여", "레시피", "커뮤니티"],
    concept: "시청자들이 제안한 레시피로 요리 대결",
    flow: [
      "사전 공지: SNS에서 레시피 아이디어 모집",
      "본 콘텐츠: 선정된 3개 레시피 직접 조리",
      "평가: 맛, 간편성, 창의성 기준 순위 결정",
      "후속: 우승 레시피 '공식 레시피'로 브랜드 채널 업로드"
    ],
    rationale: "시청자 참여형 콘텐츠는 '커뮤니티 활성화'에 효과적입니다. 제품이 '창작의 도구'로 포지셔닝되어 '다양한 활용법'이 자연스럽게 소개됩니다.",
    synergy: "팬덤의 '소속감'과 '성취감'을 자극합니다. 우승자의 SNS 공유로 인한 '2차 바이럴'이 기대되며, 브랜드-셀럽-팬덤의 '삼각 시너지'가 완성됩니다.",
    theme: 'pink'
  }
];

export const strategicPillars = [
  // 정확히 3개 (theme: green, blue, pink 순서)
  {
    id: 0,
    tabTitle: "브랜드 철학",
    icon: "Scale",
    title: "브랜드 일치: 공유된 가치관",
    subtitle: "브랜드와 셀럽이 공유하는 핵심 가치",
    theme: 'green' as const,
    context: {
      label: "셀럽 인사이트",
      headline: "진정성을 최우선으로",
      subHeadline: "품질과 정직함에 대한 일관된 메시지",
      description: "셀럽은 콘텐츠에서 항상 '진짜'를 강조합니다. 허위 광고나 과장된 효능 주장을 거부하고, '직접 사용해보고' 추천하는 방식을 고수합니다. 이러한 가치관은 브랜드의 '투명한 원재료 공개' 정책과 완벽하게 일치합니다.",
      keywords: ["진정성", "투명성", "품질우선"]
    },
    solution: {
      label: "전략적 접근",
      headline: "신뢰 기반의 파트너십",
      description: "단순 광고 집행이 아닌, '브랜드 앰버서더' 역할을 제안합니다. 장기적인 파트너십을 통해 셀럽이 브랜드의 '얼굴'이 되어 지속적인 메시지 전달이 가능합니다.",
      keyPoints: [
        "분기별 정기 콘텐츠 제작",
        "제품 개발 과정 참여 (시식단)",
        "공동 기획 한정판 출시 검토"
      ]
    }
  },
  {
    id: 1,
    tabTitle: "팬덤 니즈",
    icon: "HeartHandshake",
    title: "팬덤 분석: 충족되지 않은 욕구",
    subtitle: "시청자들이 원하지만 아직 다뤄지지 않은 영역",
    theme: 'blue' as const,
    context: {
      label: "커뮤니티 분석",
      headline: "건강한 간편식에 대한 갈증",
      subHeadline: "댓글과 커뮤니티에서 발견된 숨은 니즈",
      description: "시청자 댓글 분석 결과, '바쁜 직장인'들이 '건강하면서도 간편한' 식사 옵션을 지속적으로 요청하고 있습니다. 기존 콘텐츠에서 다뤄진 제품들은 대부분 '시간이 많이 걸리는' 요리법이었습니다.",
      keywords: ["직장인", "간편식", "건강", "시간절약"]
    },
    solution: {
      label: "니즈 충족 전략",
      headline: "5분 완성 건강식 시리즈",
      description: "제품의 '간편한 활용성'을 전면에 내세운 콘텐츠로 '미충족 니즈'를 직접 공략합니다. '바쁜 아침'이나 '야근 후 저녁' 시나리오와 연결하여 실용성을 강조합니다.",
      keyPoints: [
        "5분 이내 완성 레시피 시리즈",
        "도시락/간식 활용편",
        "직장인 공감 브이로그 형식"
      ]
    }
  },
  {
    id: 2,
    tabTitle: "성장 기회",
    icon: "TrendingUp",
    title: "블루오션: 미개척 영역",
    subtitle: "경쟁이 적고 성장 가능성이 높은 틈새",
    theme: 'pink' as const,
    context: {
      label: "시장 분석",
      headline: "프리미엄 건강식품 시장의 공백",
      subHeadline: "경쟁사들이 놓치고 있는 기회",
      description: "현재 건강식품 시장에서 '프리미엄 + 간편' 조합은 '희소한 포지션'입니다. 대부분의 브랜드가 '고가-복잡' 또는 '저가-간편' 중 하나만 선택하고 있어, 이 교차점에서 '차별화 기회'가 존재합니다.",
      keywords: ["프리미엄", "간편", "차별화", "블루오션"]
    },
    solution: {
      label: "포지셔닝 전략",
      headline: "프리미엄 간편식의 새로운 기준",
      description: "셀럽을 통해 '비싸지 않은 프리미엄', '어렵지 않은 건강식'이라는 새로운 카테고리를 정의합니다. 기존 시장의 이분법을 깨는 '제3의 선택지'로 브랜드를 각인시킵니다.",
      keyPoints: [
        "가격 대비 가치 강조",
        "누구나 할 수 있는 활용법",
        "프리미엄의 재정의 메시지"
      ]
    }
  }
];

export const externalLinks = [
  // N개 유동적 - External Links 인풋에서 추출
  // 색상 규칙:
  // - 제품 스토어: "text-olive-600 bg-olive-50 border-olive-200 hover:bg-olive-100"
  // - 캠페인 기획안: "text-emerald-600 bg-emerald-50 border-emerald-200 hover:bg-emerald-100"
  // - 채널 분석 보고서: "text-olive-600 bg-olive-50 border-olive-200 hover:bg-olive-100"
  {
    label: "제품 스토어",
    url: "https://example.com/store",
    icon: "ShoppingBag",
    color: "text-olive-600 bg-olive-50 border-olive-200 hover:bg-olive-100"
  },
  {
    label: "캠페인 기획안",
    url: "https://example.com/campaign",
    icon: "FileSpreadsheet",
    color: "text-emerald-600 bg-emerald-50 border-emerald-200 hover:bg-emerald-100"
  },
  {
    label: "채널 분석 보고서",
    url: "https://example.com/report",
    icon: "LayoutDashboard",
    color: "text-olive-600 bg-olive-50 border-olive-200 hover:bg-olive-100"
  }
];

export const reportData = { celebData, matchScore, productDefinition, matchPoints, contentIdeas, strategicPillars, externalLinks, reportTheme: '푸드' as const };

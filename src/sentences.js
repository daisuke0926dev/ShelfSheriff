// src/sentences.js
const sentences = {
  initial: {
    key: 'initial',
    text: '見 知らぬアプリを開くと、一枚のクラシックな探偵事務所の画像が現れ、そこには一台のデスク、薄暗い部屋の中で煙草の煙をくゆらせながら、探偵があなたを見据えています。',
    options: [
      { label: '中に入る', nextKey: '1' },
    ],
    background: '/images/building_in_app.jpg', // ここに画像のパスを追加
  },
  1: {
    key: '1',
    text: '探 偵「ああ、また新しい顔が見える。このシェルフシェリフのオフィスにようこそ。名前は重要じゃない。あんたが知るべきなのは、この街で本棚を通して人の心を読むのが俺の仕事だってことだけだ。」',
    options: [
      { label: '「は...はぁ...」', nextKey: '2' },
    ],
    background: '/images/detective_nomal2.jpg',
  },
  2: {
    key: '2',
    text: '探 偵「さあ、その撮影した写真を取り出して、本棚の全貌をこの探偵に見せてみな。角度に気をつけて、各書の背表紙がはっきりと見えるようにな。」',
    type: 'fileUpload', // このフィールドでファイルアップロード要求を識別します。
    options: [
      { label: '本棚の写真を見せる', nextKey: 'afterUpload' },
    ],
    background: '/images/detective_nomal.jpg',
  },
  afterUpload: {
    key: 'afterUpload',
    text: 'あ なたが本棚の写真を渡すと、探偵は少しの間写真を見つめ、次に言葉を続けます。',
    options: [
      { label: '...?', nextKey: '4' },
    ],
    background: '/images/detective_has_photo.jpg',
  },
  4: {
    key: '4',
    text: '「 うむ、これでいい。しっかりと見せてもらった。一冊一冊に込められた物語、君の選んだ本が教えてくれる君の物語をな。」',
    options: [
      { label: '「私の物語...?」', nextKey: '5' },
    ],
    background: '/images/detective_talk1.jpg',
  },
  5: {
    key: '5',
    text: '「 分析は済んだ。この結果が、君の過去のページ、そしてこれから開くべき新しい章にどんな影響を及ぼすかは知らないが、教えてやろう。君という人間を。」',
    options: [
      { label: '...?', nextKey: 'choose' },
    ],
    background: '/images/detective_talk2.jpg',
  },  
  choose: {
    key: 'choose',
    text: '次に、どの情報を探偵に伝えますか？',
    options: [
      { label: 'id', nextKey: 'id' },
      { label: 'title', nextKey: 'title' },
    ],
    background: '/images/detective_talk2.jpg',
  },
  after_choose: {
    key: 'after_choose',
    text: 'これらの選択肢から選んでください。',
    options: [
      { label: '選択肢1のラベル', nextKey: 'someKey1' },
      { label: '選択肢2のラベル', nextKey: 'someKey2' },
      // 必要に応じて他の選択肢を追加
    ],
    background: '/images/detective_talk2.jpg',
  },
  xx: {
    key: 'xx',
    text: 'xx',
    options: [
      { label: 'acs', nextKey: 'acs' },
    ],
    background: '/images/detective_talk2.jpg',
  },

};

export default sentences;

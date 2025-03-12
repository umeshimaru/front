import Image from "next/image"
import { Card, CardTitle, CardDescription } from "@/components/ui/card"

export function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202025-03-07%2013.40.50-Sh3mxumoyZlU8mgCnbkW1Up6MqnUYV.png"
              alt="SPECON Logo"
              width={180}
              height={180}
              className="mx-auto"
              priority
            />
            <h1 className="text-[#2d7f98] text-4xl md:text-5xl font-bold mt-6 mb-2">SPECON</h1>
            <p className="text-[#1a1a4b] text-lg font-medium mb-4">Speaking × Confidently</p>
          </div>
          <h2 className="text-lg md:text-xl text-[#1a1a4b] font-medium mb-12">
            隙間時間でパッと練習、話せる英語が身につく
          </h2>
        </div>
      </div>

      {/* Concerns Section */}
      <div className="flex flex-col items-center py-16 px-4">
        <div className="text-center mb-12 text-[#5aafb0]">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a4b]">こんなお悩みありませんか？</h2>
        </div>

        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "パッと英語が話せない",
              description: "ネイティブとの会話中、\n次に話す英語を頭の中で英作文して\nいて話に集中できていない...",
            },
            {
              title: "表現の幅が広がらない",
              description: "ついつい同じ表現ばかりを\n使ってしまう...",
            },
            {
              title: "忙しくて時間がない",
              description: "学校や仕事が忙しく\n時間を取れない...",
            },
          ].map((concern, index) => (
            <Card key={index} className="bg-white rounded-lg p-6 shadow-sm border border-[#5aafb0]/30">
              <CardTitle className="text-[#1a1a4b] text-xl font-bold text-center mb-4">{concern.title}</CardTitle>
              <CardDescription className="text-gray-700 text-center text-sm leading-relaxed">
                {concern.description.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < concern.description.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </CardDescription>
            </Card>
          ))}
        </div>

        {/* Large arrow pointing to conclusion */}
        <div className="flex justify-center mb-8 w-full">
          <div className="w-0 h-0 border-l-[150px] border-l-transparent border-t-[60px] border-t-cyan-100 border-r-[150px] border-r-transparent"></div>
        </div>

        {/* Bottom conclusion */}
        <div className="relative w-full max-w-5xl flex justify-center">
          <div className="border-2 border-[#5aafb0]/30 bg-white rounded-xl px-12 py-6 inline-block">
            <h2 className="text-[#1a1a4b] text-2xl md:text-3xl font-bold text-center">スピーキング力が伸びないワケ</h2>
          </div>
        </div>
      </div>

      {/* Output Training Section */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex flex-col md:flex-row items-stretch">
          <div className="w-full md:w-1/2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/25703057.jpg-eBxiCU0Z7wGWEPTi8NcUQ9KghE3aEb.jpeg"
              alt="Output training illustration showing person speaking with speech bubbles"
              width={600}
              height={400}
              className="w-full h-full object-contain rounded-lg md:rounded-l-lg md:rounded-r-none bg-white"
              priority
            />
          </div>

          <div className="w-full md:w-1/2 bg-white rounded-lg md:rounded-l-none md:rounded-r-lg p-8 shadow-sm border border-gray-100 mt-0 md:mt-0">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a4b] mb-8">
              アウトプット
              <br />
              トレーニング
              <br />
              が足りていない
            </h1>

            <p className="text-lg text-gray-800 leading-relaxed">
              文法や単語の知識を知っているだけではスピーキング力は向上しません。「知っている知識」を「使える知識」に変換するための反復練習が不可欠です
            </p>
          </div>
        </div>
      </div>

      {/* Reason Section */}
      <div className="relative w-full max-w-6xl mx-auto px-4 py-12 overflow-hidden">
        {/* Background "Reason 02" text */}
        <div className="absolute top-0 left-0 text-[120px] md:text-[180px] font-bold text-slate-50/30 leading-none z-0 select-none">
          Reason
          <br />
          02
        </div>

        {/* Main content container */}
        <div className="relative z-10 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Image - on top for mobile, on right for desktop */}
            <div className="order-1 md:order-2 md:w-1/2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/22881037.jpg-zktL23W1Upx9NtpNgWfhNLP9RplHyN.jpeg"
                alt="Two people sharing ideas with lightbulb moment"
                width={600}
                height={400}
                className="w-full h-full object-contain bg-white p-4"
              />
            </div>

            {/* Text content - below image for mobile, on left for desktop */}
            <div className="order-2 md:order-1 p-8 md:p-12 md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a4b] mb-6">
                パラフレーズ
                <br />
                トレーニングが
                <br />
                足りていない
              </h2>
              <p className="text-gray-700 leading-relaxed">
                話したい日本語の内容が難しく「○○って英語でどのように言うんだろう？」と考え始め英語がサッと口から出ないことがあります。そこで、シンプルな日本語や英語に言い換える練習が不可欠です。
              </p>
            </div>
          </div>
        </div>

        {/* Large arrow pointing to Features section */}
        <div className="flex justify-center mt-16 mb-4 w-full">
          <div className="w-0 h-0 border-l-[150px] border-l-transparent border-t-[60px] border-t-cyan-100 border-r-[150px] border-r-transparent"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a4b]">機能紹介</h2>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "瞬間英作文練習",
              description:
                "用意された動画とトランスクリプトを読みながらシャドーイングの練習ができます。単語帳に登録された単語と同じものがあったら認識して登録した単語の意味が見れちゃう・録音もできるよ！",
              imageSrc:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202025-03-07%2015.28.32-N0kW41P66h0ataYDGbfK6jlrll0s7L.png",
              imageAlt: "瞬間英作文練習 screenshot",
            },
            {
              title: "パラフレーズ練習",
              description:
                "問題の英文を読み上げると自動的にマイクに入力された声を採点し、5つの項目でスコアを表示します。レベル切り替え機能やランキング機能もあるよ⭐️",
              imageSrc:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202025-03-07%2015.28.32-N0kW41P66h0ataYDGbfK6jlrll0s7L.png",
              imageAlt: "パラフレーズ練習 screenshot",
            },
            {
              title: "画像模写練習",
              description:
                "自分だけの単語帳を作り、管理できます。登録した単語の発音も聞くことができて、単語登録数をみんなで競い合うこともできる✨",
              imageSrc:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202025-03-07%2015.28.32-N0kW41P66h0ataYDGbfK6jlrll0s7L.png",
              imageAlt: "画像模写練習 screenshot",
            },
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <Image
                src={feature.imageSrc || "/placeholder.svg"}
                alt={feature.imageAlt}
                width={320}
                height={640}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-[#1a1a4b] mb-4">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Try Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center bg-gradient-to-t from-white via-white to-transparent z-50">
        <button
          className="bg-[#ff6b2c] hover:bg-[#ff5a15] text-white font-bold py-4 px-12 rounded-full shadow-lg transition-colors"
          aria-label="使ってみる"
        >
          使ってみる
        </button>
      </div>
    </>
  )
}


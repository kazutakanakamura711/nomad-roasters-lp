import { ArrowDownRight, ArrowRight } from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'

type ImageProps = {
  src: string
  alt: string
  className?: string
}

const Image = ({ src, alt, className = '' }: ImageProps) => (
  <img className={className} src={src} alt={alt} loading="lazy" />
)

const Reveal = ({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

const products = [
  {
    name: 'エチオピア / グジ',
    notes: 'フローラル / ピーチ / ティー',
    price: '¥1,980',
    image: '/images/coffee-ethiopia-guji.jpg',
  },
  {
    name: 'グアテマラ / ウエウエテナンゴ',
    notes: 'チョコレート / オレンジ / キャラメル',
    price: '¥1,780',
    image: '/images/coffee-guatemala-huehuetenango.jpg',
  },
  {
    name: 'コロンビア / ウイラ',
    notes: 'ベリー / ブラウンシュガー / シトラス',
    price: '¥1,850',
    image: '/images/coffee-colombia-huila.jpg',
  },
]

const process = [
  {
    number: '01',
    title: '豆を選ぶ',
    body: '世界各地の小さな農園を訪ね、品質と持続可能性への思いを共有する生産者と、顔の見える関係を築きます。',
    image: '/images/brand-farmer-picking.jpg',
  },
  {
    number: '02',
    title: '焙煎する',
    body: '産地ごとの個性を隠すことなく引き出すため、豆の状態を見極めながら少量ずつ丁寧に焙煎します。',
    image: '/images/process-roasting.jpg',
  },
  {
    number: '03',
    title: '丁寧に淹れる',
    body: '豆が持つ魅力と背景の物語を一杯に表現できるよう、さまざまな抽出方法で味わいを確かめます。',
    image: '/images/process-brewing.jpg',
  },
  {
    number: '04',
    title: '味わう',
    body: '焙煎したてのコーヒーをご自宅へ。東京のカフェでも、ゆっくり流れる朝の時間とともにお楽しみいただけます。',
    image: '/images/process-enjoying.jpg',
  },
]

const journal = [
  {
    title: 'エチオピアを訪ねて',
    meta: '産地 / 読了8分 / 2026年8月',
    image: '/images/journal-ethiopia.jpg',
    alt: 'エチオピアのコーヒー産地で収穫されるコーヒーチェリー',
  },
  {
    title: '私たちの焙煎',
    meta: '焙煎 / 読了6分 / 2026年7月',
    image: '/images/journal-roasting.jpg',
    alt: '焙煎したコーヒー豆を丁寧に扱うロースター',
  },
  {
    title: 'おいしい朝の淹れ方',
    meta: '淹れ方 / 読了5分 / 2026年6月',
    image: '/images/journal-morning-brew.jpg',
    alt: '朝の光のなかでハンドドリップするコーヒー',
  },
]

const nav = [
  ['COFFEE', 'coffee'],
  ['STORY', 'story'],
  ['SUBSCRIPTION', 'subscription'],
  ['SHOP', 'coffee'],
  ['JOURNAL', 'journal'],
]

function App() {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [parallax, setParallax] = useState(0)
  const [cartCount, setCartCount] = useState(0)
  const [cartNotice, setCartNotice] = useState('')
  const reducedMotion = useReducedMotion()

  const addToCart = (productName: string) => {
    const nextCount = cartCount + 1
    setCartCount(nextCount)
    setCartNotice(
      `${productName}をカートに追加しました。カート内の商品は${nextCount}件です。`,
    )
  }

  useEffect(() => {
    const updateScroll = () => {
      setHasScrolled(window.scrollY > 64)
      if (!reducedMotion) setParallax(window.scrollY * 0.28)
    }
    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    return () => window.removeEventListener('scroll', updateScroll)
  }, [reducedMotion])

  return (
    <>
      <header
        className={`site-header ${hasScrolled ? 'site-header--scrolled' : ''}`}
      >
        <a className="brand" href="#top" aria-label="Nomad Roasters home">
          NOMAD ROASTERS
        </a>
        <nav aria-label="Primary navigation">
          {nav.map(([label, target]) => (
            <a key={label} href={`#${target}`}>
              {label}
            </a>
          ))}
        </nav>
        <a className="cart-link" href="#coffee">
          CART ({cartCount})
        </a>
        <p className="sr-only" role="status" aria-live="polite">
          {cartNotice}
        </p>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div
            className="hero__media"
            style={{ transform: `translateY(${parallax}px)` }}
          >
            <Image
              src="/images/hero-coffee-beans.jpg"
              alt="焙煎されたコーヒー豆"
            />
          </div>
          <div className="hero__shade" />
          <div className="page-shell hero__content">
            <p className="eyebrow eyebrow--light">SPECIALTY COFFEE — TOKYO</p>
            <h1 id="hero-title">
              Coffee for
              <br />
              the journey.
            </h1>
            <p className="hero__intro">
              一杯のコーヒーから、
              <br />
              日常を少しだけ遠くへ。
            </p>
            <div className="hero__actions">
              <a className="button button--light" href="#coffee">
                SHOP COFFEE <ArrowRight />
              </a>
              <a className="text-link text-link--light" href="#story">
                EXPLORE OUR STORY <ArrowDownRight />
              </a>
            </div>
          </div>
          <a className="hero__scroll" href="#story">
            SCROLL <span />
          </a>
        </section>

        <section
          className="story section page-shell"
          id="story"
          aria-labelledby="story-title"
        >
          <Reveal className="story__copy">
            <p className="eyebrow">OUR PHILOSOPHY</p>
            <h2 id="story-title">
              遠くの農園から、
              <br />
              あなたの朝まで。
            </h2>
            <p>
              コーヒーには、
              <br />
              土地、気候、人、時間の物語があります。
            </p>
            <p>
              私たちは世界各地の生産者と向き合い、
              <br />
              その土地らしさを最大限に引き出す
              <br />
              焙煎を行っています。
            </p>
            <a className="text-link" href="#process">
              READ OUR STORY <ArrowDownRight />
            </a>
          </Reveal>
          <Reveal className="story__images">
            <figure className="story__tall">
              <Image
                src="/images/brand-farmer-picking.jpg"
                alt="コーヒー農園で収穫をする生産者"
              />
            </figure>
            <figure className="story__wide">
              <Image
                src="/images/brand-huila-harvest.jpg"
                alt="コロンビア、ウイラ地域のコーヒー農園"
              />
              <figcaption>HUILA REGION, COLOMBIA — 2026</figcaption>
            </figure>
          </Reveal>
        </section>

        <section
          className="featured section"
          id="coffee"
          aria-labelledby="featured-title"
        >
          <div className="page-shell section-heading">
            <div>
              <p className="eyebrow">COFFEE SELECTION</p>
              <h2 id="featured-title">今月のおすすめ</h2>
            </div>
            <a className="text-link" href="#subscription">
              すべて見る <ArrowRight />
            </a>
          </div>
          <div className="product-scroll" aria-label="おすすめのコーヒー">
            {products.map((product) => (
              <article className="product-card" key={product.name}>
                <div className="product-card__image">
                  <Image
                    src={product.image}
                    alt={`${product.name}のコーヒー`}
                  />
                  <button
                    type="button"
                    aria-label={`${product.name}をカートに追加`}
                    onClick={() => addToCart(product.name)}
                  >
                    カートに追加 <ArrowRight />
                  </button>
                </div>
                <div className="product-card__details">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.notes}</p>
                  </div>
                  <div className="product-card__price">
                    <span>250g</span>
                    <strong>{product.price}</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="process section page-shell"
          id="process"
          aria-labelledby="process-title"
        >
          <Reveal className="process__heading">
            <p className="eyebrow">私たちのプロセス</p>
            <h2 id="process-title">農園から、一杯になるまで。</h2>
          </Reveal>
          <div className="process__steps">
            {process.map((step, index) => (
              <Reveal
                className={`process-step ${index % 2 ? 'process-step--reverse' : ''}`}
                key={step.number}
              >
                <Image src={step.image} alt={step.title} />
                <div>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="roasting" aria-labelledby="roasting-title">
          <div className="page-shell roasting__grid">
            <Reveal>
              <p className="eyebrow eyebrow--light">OUR ROASTERY</p>
              <h2 id="roasting-title">
                少量ずつ、
                <br />
                丁寧に焙煎。
              </h2>
              <p className="roasting__lead">
                豆の個性に合わせ、
                <br />
                毎週少量ずつ焙煎しています。
              </p>
              <p className="roasting__body">
                産地が持つ本来の魅力を引き出すため、
                <br />
                豆ごとに焙煎の設計を細かく調整します。
                <br />
                個性を隠さず、ありのままを際立たせます。
              </p>
            </Reveal>
            <Image
              src="/images/roasting-machine.jpg"
              alt="焙煎機でコーヒー豆を焙煎する様子"
            />
          </div>
          <div className="page-shell stats">
            <div>
              <strong>12+</strong>
              <span>産地</span>
            </div>
            <div>
              <strong>52</strong>
              <span>年間焙煎</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>単一産地</span>
            </div>
          </div>
        </section>

        <section
          className="subscription section page-shell"
          id="subscription"
          aria-labelledby="subscription-title"
        >
          <Reveal className="subscription__heading">
            <p className="eyebrow">SUBSCRIPTION / COFFEE DELIVERED</p>
            <h2 id="subscription-title">
              月に一度、
              <br />
              その季節におすすめの豆をお届けします。
            </h2>
            <p>送料無料 — FREE SHIPPING</p>
          </Reveal>
          <div className="plans">
            <article>
              <p>2袋プラン</p>
              <strong>
                ¥3,800<span>/月</span>
              </strong>
              <p>
                季節に合わせて選んだ200gのコーヒー豆を2袋。毎日の一杯におすすめです。
              </p>
              <a className="button" href="#cafe">
                定期便をはじめる <ArrowRight />
              </a>
            </article>
            <article className="plans__popular">
              <span>人気</span>
              <p>3袋プラン</p>
              <strong>
                ¥5,200<span>/月</span>
              </strong>
              <p>
                200gのコーヒー豆を3袋。さまざまな産地を巡り、新しいお気に入りと出会えます。
              </p>
              <a className="button button--light" href="#cafe">
                定期便をはじめる <ArrowRight />
              </a>
            </article>
          </div>
        </section>

        <section className="cafe" id="cafe" aria-labelledby="cafe-title">
          <div className="cafe__photo">
            <Image
              src="/images/cafe-tokyo.jpg"
              alt="東京のNomad Roastersカフェ"
            />
          </div>
          <Reveal className="cafe__copy">
            <p className="eyebrow">VISIT US</p>
            <h2 id="cafe-title">
              NOMAD ROASTERS
              <br />
              TOKYO
            </h2>
            <div>
              <p>
                Hours 8:00–18:00
                <br />
                Closed Tuesdays
              </p>
              <p>
                We serve
                <br />
                Coffee / Pastry / Beans
              </p>
            </div>
            <a className="text-link" href="#top">
              GET DIRECTIONS <ArrowUpRight />
            </a>
          </Reveal>
        </section>

        <section
          className="journal section page-shell"
          id="journal"
          aria-labelledby="journal-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">JOURNAL</p>
              <h2 id="journal-title">コーヒーのある風景。</h2>
            </div>
            <a className="text-link" href="#top">
              記事をすべて見る <ArrowRight />
            </a>
          </div>
          <div className="journal__grid">
            {journal.map((article) => (
              <article key={article.title}>
                <Image src={article.image} alt={article.alt} />
                <p>{article.meta}</p>
                <h3>{article.title}</h3>
                <a href="#top" aria-label={`${article.title}を読む`}>
                  <ArrowUpRight />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="instagram" aria-labelledby="instagram-title">
          <div className="page-shell instagram__heading">
            <div>
              <p className="eyebrow">@NOMADROASTERS</p>
              <h2 id="instagram-title">
                日常の一杯を、
                <br />
                もっと自由に。
              </h2>
            </div>
            <a className="text-link" href="#top">
              <span className="instagram-mark" aria-hidden="true" /> FOLLOW ON
              INSTAGRAM
            </a>
          </div>
          <div className="instagram__grid">
            {Array.from({ length: 8 }, (_, index) => (
              <Image
                key={index}
                src={`/images/instagram-0${index + 1}.jpg`}
                alt="Nomad RoastersのInstagram投稿"
              />
            ))}
          </div>
        </section>

        <section className="final-cta" aria-labelledby="cta-title">
          <Image
            src="/images/final-cta-coffee-cup.jpg"
            alt="朝の光のなかのコーヒーカップ"
          />
          <div>
            <h2 id="cta-title">
              FIND YOUR
              <br />
              COFFEE
            </h2>
            <a className="button button--light" href="#coffee">
              SHOP NOW <ArrowRight />
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div className="page-shell footer__top">
          <div>
            <a className="brand" href="#top">
              NOMAD ROASTERS
            </a>
            <p>遠くの農園から、あなたの朝まで。</p>
          </div>
          <div>
            <p className="eyebrow eyebrow--light">MENU</p>
            {nav.map(([label, target]) => (
              <a key={label} href={`#${target}`}>
                {label}
              </a>
            ))}
          </div>
          <div>
            <p className="eyebrow eyebrow--light">FOLLOW</p>
            <a href="#top">INSTAGRAM</a>
            <a href="#top">X / TWITTER</a>
          </div>
        </div>
        <div className="page-shell footer__bottom">
          <span>© NOMAD ROASTERS — All rights reserved</span>
          <span>Tokyo, Japan</span>
        </div>
      </footer>
    </>
  )
}

const ArrowUpRight = ArrowDownRight

export default App

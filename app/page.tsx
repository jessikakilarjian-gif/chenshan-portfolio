"use client";

import { type CSSProperties, type PointerEvent, useEffect, useRef } from "react";

const base = "/portfolio";

type ProcessCardProps = {
  index: string;
  title: string;
  category: string;
  processImage: string;
  finalImage: string;
  description: string;
  tall?: boolean;
};

function ProcessCard({
  index,
  title,
  category,
  processImage,
  finalImage,
  description,
  tall = false,
}: ProcessCardProps) {
  const setReveal = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const value = ((event.clientX - bounds.left) / bounds.width) * 100;
    event.currentTarget.style.setProperty(
      "--reveal",
      `${Math.max(8, Math.min(92, value))}%`,
    );
  };

  return (
    <article
      className={`process-card reveal ${tall ? "process-card--tall" : ""}`}
      style={{ "--reveal": "100%" } as CSSProperties}
      onPointerMove={setReveal}
      onPointerLeave={(event) =>
        event.currentTarget.style.setProperty("--reveal", "100%")
      }
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.currentTarget.style.setProperty("--reveal", "35%");
        }
        if (event.key === "ArrowRight") {
          event.currentTarget.style.setProperty("--reveal", "100%");
        }
      }}
      tabIndex={0}
      aria-label={`${title}，移动鼠标或使用左右方向键查看线稿与成片`}
    >
      <div className="process-media">
        <img
          className="process-image process-image--draft"
          src={`${base}/${processImage}`}
          alt={`${title}线稿过程`}
          loading="lazy"
        />
        <div className="process-final">
          <img
            className="process-image"
            src={`${base}/${finalImage}`}
            alt={`${title}最终成片`}
            loading="lazy"
          />
        </div>
        <div className="process-divider" aria-hidden="true">
          <span>↔</span>
        </div>
        <div className="process-badges" aria-hidden="true">
          <span>PROCESS</span>
          <span>FINAL</span>
        </div>
      </div>
      <div className="process-copy">
        <div>
          <span className="work-index">{index}</span>
          <p>{category}</p>
        </div>
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </article>
  );
}

type VideoCardProps = {
  title: string;
  tag: string;
  src: string;
  poster: string;
  wide?: boolean;
};

function VideoCard({ title, tag, src, poster, wide = false }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => {
    void videoRef.current?.play();
  };

  const reset = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };

  return (
    <button
      type="button"
      className={`video-card reveal ${wide ? "video-card--wide" : ""}`}
      onPointerEnter={play}
      onPointerLeave={reset}
      onClick={toggle}
      aria-label={`${title}，点击播放或暂停`}
    >
      <video
        ref={videoRef}
        src={`${base}/${src}`}
        poster={`${base}/${poster}`}
        muted
        loop
        playsInline
        preload="metadata"
      />
      <span className="video-shade" />
      <span className="video-topline">
        <span>{tag}</span>
        <span>0{wide ? "4" : "·"} / MOTION</span>
      </span>
      <span className="video-title">{title}</span>
      <span className="video-hint">HOVER TO PLAY ↗</span>
    </button>
  );
}

export default function Home() {
  useEffect(() => {
    const root = document.documentElement;
    const movePointer = (event: globalThis.PointerEvent) => {
      root.style.setProperty("--pointer-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", movePointer, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

    return () => {
      window.removeEventListener("pointermove", movePointer);
      observer.disconnect();
    };
  }, []);

  return (
    <main>
      <a className="skip-link" href="#work">
        跳到作品区
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="返回首页">
          <span>CS</span>
          <small>PORTFOLIO / 2026</small>
        </a>
        <nav aria-label="主要导航">
          <a href="#about">关于我</a>
          <a href="#work">精选作品</a>
          <a href="#contact">联系我</a>
        </nav>
        <a className="status-pill" href="#contact">
          <i /> 求职中
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-kicker reveal">
          <span>三维设计师</span>
          <span>武汉 / 中国</span>
        </div>

        <div className="hero-title reveal">
          <p>CHEN SHAN · VISUAL DESIGNER</p>
          <h1>
            3D <em>×</em> AI
            <br />
            <span>视觉设计师</span>
          </h1>
        </div>

        <div className="hero-visual reveal">
          <div className="hero-frame">
            <img
              src={`${base}/teapot-final.jpg`}
              alt="陈珊的花茶壶商业视觉作品"
            />
            <span className="scan-line" aria-hidden="true" />
            <div className="frame-corner frame-corner--one" />
            <div className="frame-corner frame-corner--two" />
          </div>
          <span className="hero-caption">FEATURED / PRODUCT CGI</span>
        </div>

        <div className="hero-intro reveal">
          <p>
            三维为骨，AI 为翼。用十年设计经验，把概念、建模、渲染、动态视觉与剪辑，连成完整的作品。
          </p>
          <a href="#work">浏览作品 <span>↓</span></a>
        </div>

        <div className="hero-stats reveal" aria-label="个人经验数据">
          <div><strong>10+</strong><span>年设计经验</span></div>
          <div><strong>01</strong><span>人完成全流程</span></div>
          <div><strong>3D+AI</strong><span>融合创作方式</span></div>
        </div>
      </section>

      <section className="about section-shell" id="about">
        <div className="section-label reveal">
          <span>01</span>
          <p>ABOUT / CAPABILITIES</p>
        </div>
        <div className="about-heading reveal">
          <p>您好，我是陈珊。</p>
          <h2>从概念到成片，<br />一人即团队。</h2>
        </div>
        <div className="about-copy reveal">
          <p>
            我是一名拥有十年经验的三维设计师，主攻三维与 AI 融合设计。日常使用 C4D 完成建模、渲染和动态视觉，也熟练掌握视频剪辑与画面精修。
          </p>
          <p>
            我擅长用 AI 提升创意效率和作品质感，无论是商业海报、产品动画，还是品牌动态视觉，都能独立完成全流程制作。
          </p>
        </div>
        <div className="skill-grid">
          {[
            ["01", "3D 建模与渲染", "C4D / 产品视觉 / 材质灯光"],
            ["02", "AI 融合创意", "概念生成 / 视觉延展 / 效率提升"],
            ["03", "动态视觉", "产品动画 / 品牌短片 / 节奏设计"],
            ["04", "后期与剪辑", "画面精修 / 视频剪辑 / 成片输出"],
          ].map(([number, title, copy]) => (
            <article className="skill-card reveal" key={number}>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
              <i aria-hidden="true">↗</i>
            </article>
          ))}
        </div>
      </section>

      <section className="works section-shell" id="work">
        <div className="section-label reveal">
          <span>02</span>
          <p>SELECTED WORK / 作品精选</p>
        </div>
        <div className="works-heading reveal">
          <h2>把过程，<br />也变成作品。</h2>
          <p>在图片上移动鼠标，查看线稿与最终成片之间的变化。</p>
        </div>

        <div className="process-grid">
          <ProcessCard
            index="01"
            title="花茶壶产品视觉"
            category="产品 CGI / 商业海报"
            processImage="teapot-process.jpg"
            finalImage="teapot-final.jpg"
            description="从场景草图、产品表现到生活方式海报，建立温暖、精致的产品记忆点。"
            tall
          />
          <ProcessCard
            index="02"
            title="零食狂欢节"
            category="电商视觉 / 活动主KV"
            processImage="campaign-process.jpg"
            finalImage="campaign-final.jpg"
            description="以礼盒与飘带形成视觉动线，用高饱和红金配色强化促销氛围与信息冲击力。"
          />
          <ProcessCard
            index="03"
            title="儿童洗护视觉"
            category="品牌视觉 / 产品场景"
            processImage="kids-care-process.jpg"
            finalImage="kids-care-final.jpg"
            description="把产品放入明亮的度假场景，用柔和材质与童趣元素传递安全、轻松的品牌感受。"
          />
        </div>
      </section>

      <section className="motion section-shell" id="motion">
        <div className="section-label reveal">
          <span>03</span>
          <p>MOTION LAB / 动态实验</p>
        </div>
        <div className="motion-heading reveal">
          <h2>静帧之外，<br />让画面流动。</h2>
          <p>鼠标经过自动播放，移开后回到开头；手机上可以点击播放。</p>
        </div>
        <div className="video-grid">
          <VideoCard
            title="Beauty Detail"
            tag="AI VISUAL"
            src="beauty-motion.mp4"
            poster="beauty-poster.jpg"
          />
          <VideoCard
            title="Fashion Form"
            tag="FASHION FILM"
            src="fashion-motion.mp4"
            poster="fashion-poster.jpg"
          />
          <VideoCard
            title="Product Motion"
            tag="PRODUCT CGI"
            src="teapot-motion.mp4"
            poster="teapot-poster.jpg"
          />
          <VideoCard
            title="AI Story Frame"
            tag="AI ANIMATION"
            src="anime-motion.mp4"
            poster="anime-poster.jpg"
            wide
          />
        </div>
      </section>

      <footer className="contact section-shell" id="contact">
        <div className="contact-orbit" aria-hidden="true"><span>CS</span></div>
        <div className="section-label reveal">
          <span>04</span>
          <p>CONTACT / 联系方式</p>
        </div>
        <div className="contact-main reveal">
          <p>如果你正在寻找一位能独立完成全流程的设计师——</p>
          <h2>让我们一起，<br /><em>做点好作品。</em></h2>
        </div>
        <div className="contact-links reveal">
          <a href="tel:15527768453">
            <span>电话</span>
            <strong>155 2776 8453</strong>
            <i>↗</i>
          </a>
          <a href="mailto:1039541233@qq.com">
            <span>邮箱</span>
            <strong>1039541233@qq.com</strong>
            <i>↗</i>
          </a>
        </div>
        <div className="footer-line">
          <span>© 2026 CHEN SHAN</span>
          <span>3D × AI VISUAL DESIGNER</span>
          <a href="#top">返回顶部 ↑</a>
        </div>
      </footer>
    </main>
  );
}

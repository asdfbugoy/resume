import type { ReactNode } from "react";

type IconName =
  | "caret-down"
  | "eye"
  | "download"
  | "user"
  | "user-plus";

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    "caret-down": <path d="M0 0h10L5 6 0 0z" />,
    eye: (
      <>
        <path d="M8 3C4.2 3 1.3 5.9.4 8c.9 2.1 3.8 5 7.6 5s6.7-2.9 7.6-5C14.7 5.9 11.8 3 8 3zm0 8.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z" />
        <circle cx="8" cy="8" r="2" />
      </>
    ),
    download: (
      <>
        <path d="M7 2h2v6H7z" />
        <path d="M5 8h6L8 11.5 5 8z" />
        <path d="M2 12.5h12v2H2z" />
      </>
    ),
    user: (
      <>
        <circle cx="8" cy="5" r="3" />
        <path d="M2.5 14c0-3.1 2.4-4.6 5.5-4.6s5.5 1.5 5.5 4.6H2.5z" />
      </>
    ),
    "user-plus": (
      <>
        <circle cx="6.5" cy="5" r="3" />
        <path d="M1 14c0-3.1 2.1-4.6 5.5-4.6S12 10.9 12 14H1z" />
        <path d="M12.5 1h1.8v1.8h1.8v1.8h-1.8v1.8h-1.8V4.6h-1.8V2.8h1.8z" />
      </>
    ),
  };
  return (
    <svg className="icon" viewBox="0 0 16 16" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

/* ------------------------------- top bar -------------------------------- */

function TopBar() {
  return (
    <div className="top-bar">
      <div className="top-bar-inner">
        <nav className="links" aria-label="Related sites">
          <a href="https://factorio.com">Factorio.com</a>
          <span className="separator">|</span>
          <a href="https://forums.factorio.com">Forums</a>
          <span className="separator">|</span>
          <a href="https://wiki.factorio.com">Wiki</a>
          <span className="separator">|</span>
          <a href="https://mods.factorio.com">Mod Portal</a>
          <span className="separator">|</span>
          <a href="https://github.com/wube-projects">API Docs</a>
        </nav>
        <div className="links user-controls">
          <a href="#">
            <Icon name="user" />
            Log in
          </a>
          <span className="separator">|</span>
          <a href="#">
            <Icon name="user-plus" />
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- header -------------------------------- */

function Dropdown({
  label,
  icon,
  items,
}: {
  label: string;
  icon?: ReactNode;
  items: { label: string; green?: boolean }[];
}) {
  return (
    <div className="dropdown">
      <a className="button" href="#">
        <span className="flex flex-items-center">
          {icon}
          {label}
        </span>
        <Icon name="caret-down" />
      </a>
      <div className="submenu" role="menu">
        {items.map((item) => (
          <a
            key={item.label}
            role="menuitem"
            className={item.green ? "button button-green" : "button"}
            href="#"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function Header() {
  return (
    <header>
      <div className="header-inner">
        <a className="header-logo" href="#">
          <span className="wordmark">Factorio</span>
        </a>
        <nav className="header-links" aria-label="Main">
          <Dropdown
            label="Game"
            items={[
              { label: "Screenshots" },
              { label: "Videos" },
              { label: "Content" },
              { label: "Merch" },
              { label: "Artwork" },
              { label: "About us" },
              { label: "Buy", green: true },
              { label: "Demo", green: true },
            ]}
          />
          <Dropdown
            label="Space Age"
            icon={<span className="logo-expansion-space-age" aria-hidden="true" />}
            items={[
              { label: "Content" },
              { label: "Galaxy" },
              { label: "Presskit" },
              { label: "Buy", green: true },
            ]}
          />
          <a className="button" href="#">
            Blog
          </a>
          <Dropdown
            label="Support"
            items={[
              { label: "Help" },
              { label: "FAQ" },
              { label: "Presskit" },
              { label: "Contact" },
            ]}
          />
        </nav>
      </div>
    </header>
  );
}

/* -------------------------------- trailers ------------------------------- */

function TrailerPanel({
  title,
  caption,
  captionLink,
  timecode,
}: {
  title: string;
  caption: string;
  captionLink: string;
  timecode: string;
}) {
  return (
    <div>
      <section className="panel">
        <h2>{title}</h2>
        <div className="panel-inset-lighter">
          <a className="trailer" href="#">
            <span className="play-button" />
            <span className="timecode">{timecode}</span>
          </a>
        </div>
        <div className="panel-inset p1 flex flex-items-center text-right">
          <p className="m0">
            {caption}{" "}
            <a href="#">{captionLink}</a>.
          </p>
        </div>
      </section>
    </div>
  );
}

function Trailers() {
  return (
    <div className="panels2">
      <TrailerPanel
        title="Factorio: Space Age - Trailer"
        caption="Check out the"
        captionLink="Space Age Expansion"
        timecode="1:29"
      />
      <TrailerPanel
        title="Factorio - Trailer"
        caption="Check out the"
        captionLink="game content"
        timecode="1:49"
      />
    </div>
  );
}

/* -------------------------------- grid boxes ----------------------------- */

function AboutBox() {
  return (
    <div className="box-about panel">
      <h2>About the game</h2>
      <div className="panel-inset-lighter p8 mt0" style={{ padding: "8px 8px 0" }}>
        <p>
          Factorio is a game in which you build and maintain factories. You will be
          mining resources, researching technologies, building infrastructure,
          automating production, and fighting enemies.
        </p>
        <p>
          Use your imagination to design your factory, combine simple elements into
          ingenious structures, apply management skills to keep it working, and
          protect it from the creatures who don&apos;t really like you.
        </p>
        <div className="mm6 flex flex-wrap" style={{ margin: "0 -6px 16px" }}>
          <span className="w50p" style={{ display: "block" }}>
            <span className="media media-screenshot" />
          </span>
          <span className="w50p" style={{ display: "block" }}>
            <span className="media media-screenshot media-screenshot--b" />
          </span>
        </div>
        <p>
          The game is very stable and optimized for building massive factories. You
          can create your own maps, write mods in Lua, or play with friends via
          Multiplayer.
        </p>
        <p>
          Factorio was in development from the spring of 2012 to the beginning of
          2021. So far over 3,500,000 people have bought the game. You can get it
          from{" "}
          <a href="https://store.steampowered.com/app/495300/Factorio/" target="_blank" rel="noreferrer">
            Steam
          </a>
          , <a href="https://www.gog.com/games/factorio" target="_blank" rel="noreferrer">GOG</a>, or directly
          from our <a href="#">shop</a>.
        </p>
        <p>
          Would you like to know{" "}
          <a href="#">
            <span className="yellow">more</span>
          </a>
          ?
        </p>
        <div className="flex flex-items-center" style={{ marginTop: 16 }}>
          <a href="#" aria-label="Learn more about Factorio">
            <span className="square-sm">
              <Icon name="eye" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

function ReleasesBox() {
  return (
    <div className="box-releases panel releases">
      <h2>Latest releases</h2>
      <div className="panel-inset p4">
        <dl>
          <dt>Stable:</dt>
          <dd>
            <a className="yellow" href="#">
              2.0.77
            </a>
          </dd>
        </dl>
        <hr className="mn" />
        <dl>
          <dt>Experimental:</dt>
          <dd>
            <a className="yellow" href="#">
              2.1.20
            </a>
          </dd>
        </dl>
      </div>
      <div className="panel-inset flex flex-items-center flex-space-between">
        <span className="flex flex-items-center">
          Download page
        </span>
        <a href="#" aria-label="Download page">
          <span className="square-sm">
            <Icon name="download" />
          </span>
        </a>
      </div>
    </div>
  );
}

function LinksBox() {
  return (
    <div className="box-links">
      <a className="button-green-right" href="#">
        Try Demo
      </a>
      <a
        className="button-green-right"
        href="https://store.steampowered.com/app/495300/Factorio/"
        target="_blank"
        rel="noreferrer"
      >
        Buy Factorio
      </a>
      <a
        className="button-green-right"
        href="https://store.steampowered.com/app/2523920/Factorio__Space_Age/"
        target="_blank"
        rel="noreferrer"
      >
        Buy Factorio: Space Age
      </a>
      <a
        className="button-green-right"
        href="https://www.nintendo.com/homes/store/detail/"
        target="_blank"
        rel="noreferrer"
      >
        Buy for Nintendo Switch
      </a>
      <a
        className="button-green-right"
        href="https://www.zazzle.com/factorio"
        target="_blank"
        rel="noreferrer"
      >
        Get T-Shirt
      </a>
    </div>
  );
}

const blogPosts = [
  {
    title: "2.1.20 released",
    by: "Spacecore",
    date: "4 months ago",
    snippet:
      "Spacecore is here! Spacecore adds a new map size to Factorio, and introduces the ability to",
    variant: "media-blog",
  },
  {
    title: "2.1.19 released",
    by: "Spacecore",
    date: "5 months ago",
    snippet: "The 2.1.19 update brings a new map size: Huge!",
    variant: "media-blog--b",
  },
];

function BlogBox() {
  return (
    <div className="box-blog">
      <h2>Recent blog posts</h2>
      {blogPosts.map((post) => (
        <div key={post.title} className="blog-card">
          <a className="blog-card-thumbnail" href="#" aria-label={post.title}>
            <span className={`media ${post.variant}`} />
          </a>
          <div className="blog-card-text">
            <h3>
              <a href="#">{post.title}</a>
            </h3>
            <div className="posted-by">
              Posted by{" "}
              <a href="#">{post.by}</a>, {post.date}
            </div>
            <hr className="mn" style={{ margin: "8px 0" }} />
            <p className="snippet snippet-2 m0">{post.snippet}</p>
          </div>
        </div>
      ))}
      <div className="panel-inset flex flex-items-center flex-space-between">
        <a href="#">See all posts</a>
        <a href="#" aria-label="See all posts">
          <span className="square-sm">
            <Icon name="eye" />
          </span>
        </a>
      </div>
    </div>
  );
}

function ArtworkBox() {
  return (
    <div className="box-artwork panel">
      <h2>Artwork</h2>
      <p>
        Check out our page of Factorio artwork, concept sketches, and behind the
        scenes images.
      </p>
      <span className="media media-artwork" style={{ display: "block" }} />
    </div>
  );
}

const mods = [
  { title: "A random mod", by: "@somebody", variant: "media-mod" },
  { title: "Another", by: "@another", variant: "media-mod--b" },
  { title: "A third", by: "@third", variant: "media-mod--c" },
];

function ModsBox() {
  return (
    <div className="box-mods">
      <h2>Featured mods</h2>
      <div className="mm6 flex flex-wrap">
        {mods.map((mod) => (
          <div key={mod.title} className="w33p mod-tile" style={{ margin: 0 }}>
            <span className={`media ${mod.variant}`} style={{ width: 144, height: 144 }} />
            <h3 className="text-center" style={{ marginTop: 8, marginBottom: 0 }}>
              <a href="#">{mod.title}</a>
            </h3>
            <div className="text-center" style={{ fontSize: "92%", color: "#cfcaba" }}>
              By {mod.by}
            </div>
          </div>
        ))}
      </div>
      <div className="panel-inset flex flex-items-center flex-space-between">
        <span>
          For more, visit the official <a href="https://mods.factorio.com">mod portal</a>!
        </span>
        <a href="https://mods.factorio.com" aria-label="Visit the mod portal">
          <span className="square-sm">
            <Icon name="eye" />
          </span>
        </a>
      </div>
    </div>
  );
}

function SaidBox() {
  return (
    <div className="box-said panel homepage-quote">
      <h2>Said about us</h2>
      <blockquote>
        No other game in the history of gaming handles the logistics side of
        management simulator so perfectly.
      </blockquote>
      <div style={{ textAlign: "center", color: "var(--muted)" }}>— Reddit</div>
    </div>
  );
}

function ContactBox() {
  const slots = ["F", "T", "R", "D"];
  return (
    <div className="box-contact panel">
      <h2>Community</h2>
      <div className="slots">
        {slots.map((label) => (
          <a key={label} className="slot" href="#" aria-label={`Social network ${label}`}>
            <span className="slot-button">{label}</span>
          </a>
        ))}
        <span className="slot-empty" />
        <span className="slot-empty" />
      </div>
      <div className="panel-inset flex flex-items-center flex-space-between">
        <a href="#">Contact</a>
        <a href="#" aria-label="Contact">
          <span className="square-sm">
            <Icon name="user" />
          </span>
        </a>
      </div>
    </div>
  );
}

function HomePageGrid() {
  return (
    <div className="grid-homepage">
      <AboutBox />
      <ReleasesBox />
      <LinksBox />
      <BlogBox />
      <ArtworkBox />
      <ModsBox />
      <SaidBox />
      <ContactBox />
    </div>
  );
}

/* --------------------------------- footer -------------------------------- */

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner panel">
        <nav className="footer-links" aria-label="Legal">
          <a href="#">Terms of Service</a>
          <span className="separator">|</span>
          <a href="#">Privacy</a>
          <span className="separator">|</span>
          <a href="#">Imprint</a>
          <span className="separator">|</span>
          <a href="#">Presskit</a>
          <span className="separator">|</span>
          <a href="#">Contact</a>
          <span className="separator">|</span>
          <a href="#">RSS</a>
          <span className="separator">|</span>
          <a href="#">Jobs</a>
        </nav>
        <div className="footer-rocket" aria-hidden="true">
          <svg className="rocket" viewBox="0 0 78 120">
            <path
              d="M39 4c8 10 12 22 12 34v44H27V38c0-12 4-24 12-34z"
              fill="#5a5a5a"
            />
            <circle cx="39" cy="38" r="8" fill="#7dcaed" opacity="0.8" />
            <path d="M27 62 12 84v-20zM51 62l15 22V64z" fill="#8e8e8e" />
            <path d="M33 82h12l-6 22z" fill="#ffa200" />
          </svg>
        </div>
        <div className="footer-copyright">
          <span>
            Copyright © 2015 - 2026 Wube Software - all rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------- page ---------------------------------- */

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <main className="container">
        <Trailers />
        <HomePageGrid />
      </main>
      <Footer />
    </>
  );
}

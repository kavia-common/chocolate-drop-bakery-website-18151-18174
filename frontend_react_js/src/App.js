import React, { useMemo, useRef, useState } from 'react';
import './App.css';
import './index.css';

/**
 * The Chocolate Drop - Mobile-first web app
 * Ocean Professional theme, smooth, app-like feel
 */

// Demo gallery images (royalty-free placeholders)
const galleryItems = [
  { id: 1, title: 'Belgian Chocolate Cake', category: 'Cakes', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200&auto=format&fit=crop' },
  { id: 2, title: 'Chocolate Cupcakes', category: 'Cupcakes', img: 'https://images.unsplash.com/photo-1519861155730-5331123be1e0?q=80&w=1200&auto=format&fit=crop' },
  { id: 3, title: 'Chocolate Drip Cake', category: 'Cakes', img: 'https://images.unsplash.com/photo-1599785209796-6c03c8f7b31f?q=80&w=1200&auto=format&fit=crop' },
  { id: 4, title: 'Chocolate Tart', category: 'Desserts', img: 'https://images.unsplash.com/photo-1546549039-49b81aa20a53?q=80&w=1200&auto=format&fit=crop' },
  { id: 5, title: 'Macarons', category: 'Desserts', img: 'https://images.unsplash.com/photo-1523983302122-73e7024a55f5?q=80&w=1200&auto=format&fit=crop' },
  { id: 6, title: 'Chocolate Truffles', category: 'Desserts', img: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=1200&auto=format&fit=crop' },
  { id: 7, title: 'Chocolate Mousse', category: 'Desserts', img: 'https://images.unsplash.com/photo-1588166713638-c7f6bcdcf3a5?q=80&w=1200&auto=format&fit=crop' },
  { id: 8, title: 'Birthday Cake', category: 'Cakes', img: 'https://images.unsplash.com/photo-1541976076758-347942db1970?q=80&w=1200&auto=format&fit=crop' },
];

// Specials and testimonials demo data
const specials = [
  { id: 'a', name: 'Midnight Belgian Cake', price: 45, desc: '72% dark imported chocolate, sea salt caramel layers', img: 'https://images.unsplash.com/photo-1615948512651-58f8b1b52af8?q=80&w=1200&auto=format&fit=crop' },
  { id: 'b', name: 'Amber Crunch Cupcakes', price: 18, desc: 'Box of 6, amber brittle crunch', img: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop' },
  { id: 'c', name: 'Silk Truffle Box', price: 22, desc: 'Assorted dark/milk ganache truffles', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476b?q=80&w=1200&auto=format&fit=crop' },
];

const testimonials = [
  { id: 1, name: 'Ava R.', text: 'The richest chocolate cake we’ve ever had. Absolutely stunning and not overly sweet.', rating: 5 },
  { id: 2, name: 'Noah C.', text: 'Cupcakes are moist, chocolate is clearly premium. They nailed our custom design.', rating: 5 },
  { id: 3, name: 'Liam S.', text: 'Professional service, on-time delivery, and the taste… wow.', rating: 5 },
];

// Helpers
const currency = (n) => `$${n.toFixed(2)}`;

// PUBLIC_INTERFACE
export default function App() {
  /** UI state */
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState(null);
  const [specialIndex, setSpecialIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);

  const specialTrackRef = useRef(null);
  const reviewTrackRef = useRef(null);

  const categories = useMemo(() => ['All', ...Array.from(new Set(galleryItems.map(g => g.category)))], []);
  const filteredGallery = useMemo(
    () => (filter === 'All' ? galleryItems : galleryItems.filter(g => g.category === filter)),
    [filter]
  );

  const nextSpecial = () => setSpecialIndex((i) => (i + 1) % specials.length);
  const prevSpecial = () => setSpecialIndex((i) => (i - 1 + specials.length) % specials.length);

  const nextReview = () => setReviewIndex((i) => (i + 1) % testimonials.length);
  const prevReview = () => setReviewIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  // PUBLIC_INTERFACE
  const handleOrder = (payload) => {
    const { name, email, phone, product, message, channel } = payload;
    const summary = `Order Request - The Chocolate Drop
Name: ${name}
Email: ${email || '-'}
Phone: ${phone || '-'}
Product: ${product}
Details: ${message || '-'}`;
    if (channel === 'whatsapp') {
      const encoded = encodeURIComponent(summary);
      const url = `https://wa.me/?text=${encoded}`;
      window.open(url, '_blank', 'noopener');
    } else {
      const subject = encodeURIComponent('Order Request - The Chocolate Drop');
      const body = encodeURIComponent(summary);
      window.location.href = `mailto:orders@chocolatedrop.example?subject=${subject}&body=${body}`;
    }
  };

  // PUBLIC_INTERFACE
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Navbar onNavigate={scrollToSection} />
      <main>
        <Hero onOrderClick={() => scrollToSection('order')} />

        <section id="highlights" className="section">
          <div className="container">
            <div className="grid md-2" style={{ gap: 16 }}>
              <div className="card hero-card fade-in" style={{ padding: 20 }}>
                <div>
                  <span className="badge">Premium Imported Chocolate</span>
                  <h1 className="hero-title">The Chocolate Drop</h1>
                  <p className="hero-sub">
                    Hand-crafted cakes and desserts made with imported Belgian chocolate. Modern,
                    elegant and unforgettable flavors for your celebrations.
                  </p>
                </div>
                <div className="cards">
                  <InfoCard title="Hours" subtitle="We bake fresh daily">
                    <HoursGrid />
                  </InfoCard>
                  <InfoCard title="Menu Highlights" subtitle="Customer favorites">
                    <MenuHighlights />
                  </InfoCard>
                </div>
                <div className="hero-cta">
                  <button className="btn btn-primary" onClick={() => scrollToSection('specials')}>Today’s Specials</button>
                  <button className="btn" onClick={() => scrollToSection('gallery')}>View Gallery</button>
                </div>
              </div>
              <div className="hero-media card fade-in">
                <div className="hero-bubble blue" />
                <div className="hero-bubble amber" />
              </div>
            </div>
          </div>
        </section>

        <section id="specials" className="section">
          <div className="container">
            <SectionHeader eyebrow="Fresh Today" title="Today’s Specials" desc="Limited daily batches. Pre-order to reserve." />
            <Carousel
              items={specials}
              index={specialIndex}
              onPrev={prevSpecial}
              onNext={nextSpecial}
              trackRef={specialTrackRef}
              renderItem={(sp) => (
                <div className="card carousel-card" style={{ overflow: 'hidden' }}>
                  <div style={{ height: 160, overflow: 'hidden' }}>
                    <img src={sp.img} alt={sp.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                      <h3 className="card-title">{sp.name}</h3>
                      <span className="badge" aria-label={`Price ${currency(sp.price)}`}>{currency(sp.price)}</span>
                    </div>
                    <p className="card-sub">{sp.desc}</p>
                    <button className="btn" onClick={() => scrollToSection('order')}>Order Now</button>
                  </div>
                </div>
              )}
            />
          </div>
        </section>

        <section id="gallery" className="section">
          <div className="container">
            <SectionHeader eyebrow="Our Work" title="Cake Gallery" desc="Explore designs and flavors. Filter by category and tap to enlarge." />
            <div className="filters" style={{ marginBottom: 12 }}>
              {categories.map((c) => (
                <button
                  key={c}
                  className={`filter-btn ${filter === c ? 'active' : ''}`}
                  onClick={() => setFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="gallery-grid">
              {filteredGallery.map((g) => (
                <div key={g.id} className="gallery-item card" onClick={() => setModal(g)} role="button" aria-label={`Open ${g.title}`}>
                  <img src={g.img} alt={g.title} />
                  <span className="label">{g.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="section">
          <div className="container">
            <SectionHeader eyebrow="Kind Words" title="What Customers Say" desc="We’re grateful for your trust and support." />
            <Carousel
              items={testimonials}
              index={reviewIndex}
              onPrev={prevReview}
              onNext={nextReview}
              trackRef={reviewTrackRef}
              renderItem={(t) => (
                <div className="card carousel-card" style={{ padding: 16 }}>
                  <div className="stars" aria-label={`${t.rating} stars`}>{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
                  <p style={{ margin: '8px 0 12px 0' }}>&ldquo;{t.text}&rdquo;</p>
                  <div className="muted" style={{ fontWeight: 700 }}>{t.name}</div>
                </div>
              )}
            />
          </div>
        </section>

        <section id="order" className="section">
          <div className="container">
            <SectionHeader eyebrow="Easy Ordering" title="Place an Order" desc="Send us your request via WhatsApp or email. We’ll confirm availability and details." />
            <OrderForm onSubmit={handleOrder} />
          </div>
        </section>

        {modal && (
          <ImageModal item={modal} onClose={() => setModal(null)} />
        )}
      </main>

      <Footer onNavigate={scrollToSection} />
      <FabOrder onClick={() => scrollToSection('order')} />
    </>
  );
}

/** Components */

// PUBLIC_INTERFACE
function Navbar({ onNavigate }) {
  /** Navbar with sticky behavior */
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <div className="brand">
          <div className="brand-logo" />
          <div>
            <div className="brand-name">The Chocolate Drop</div>
            <div className="brand-sub">Imported Chocolate · Est. 2016</div>
          </div>
        </div>

        <div className="nav-links">
          <a className="nav-link" href="#highlights" onClick={(e)=>{e.preventDefault();onNavigate('highlights')}}>About</a>
          <a className="nav-link" href="#specials" onClick={(e)=>{e.preventDefault();onNavigate('specials')}}>Specials</a>
          <a className="nav-link" href="#gallery" onClick={(e)=>{e.preventDefault();onNavigate('gallery')}}>Gallery</a>
          <a className="nav-link" href="#testimonials" onClick={(e)=>{e.preventDefault();onNavigate('testimonials')}}>Reviews</a>
          <button className="btn btn-primary" onClick={()=>onNavigate('order')}>Order</button>
        </div>
      </div>
    </nav>
  );
}

function SectionHeader({ eyebrow, title, desc }) {
  return (
    <header className="fade-in" style={{ marginBottom: 16 }}>
      <span className="badge">{eyebrow}</span>
      <h2 style={{ margin: '8px 0 6px 0', fontSize: 'clamp(22px, 4.2vw, 30px)', lineHeight: 1.2 }}>{title}</h2>
      <p className="muted" style={{ margin: 0 }}>{desc}</p>
    </header>
  );
}

function InfoCard({ title, subtitle, children }) {
  return (
    <div className="card" style={{ padding: 14 }}>
      <h3 className="card-title">{title}</h3>
      <p className="card-sub">{subtitle}</p>
      {children}
    </div>
  );
}

function HoursGrid() {
  const hours = [
    ['Mon', 'Closed'],
    ['Tue–Fri', '9:00 – 18:00'],
    ['Sat', '9:00 – 16:00'],
    ['Sun', '10:00 – 14:00'],
  ];
  return (
    <div className="grid" style={{ gap: 8 }}>
      {hours.map(([day, time]) => (
        <div key={day} className="card" style={{ padding: 12, display: 'flex', justifyContent: 'space-between' }}>
          <strong>{day}</strong>
          <span className="muted">{time}</span>
        </div>
      ))}
    </div>
  );
}

function MenuHighlights() {
  const items = [
    { name: 'Belgian Chocolate Cake', tag: 'Signature' },
    { name: 'Amber Crunch Cupcakes', tag: 'Popular' },
    { name: 'Silk Truffle Box', tag: 'Gift' },
  ];
  return (
    <div className="grid" style={{ gap: 8 }}>
      {items.map((i) => (
        <div key={i.name} className="card" style={{ padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{i.name}</span>
          <span className="badge" style={{ background: 'rgba(37,99,235,0.08)', color: 'var(--primary)' }}>{i.tag}</span>
        </div>
      ))}
    </div>
  );
}

function Carousel({ items, index, onPrev, onNext, renderItem, trackRef }) {
  return (
    <div className="carousel">
      <div
        ref={trackRef}
        className="carousel-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {items.map((item) => renderItem(item))}
      </div>
      <div className="carousel-controls">
        <button className="btn" onClick={onPrev} aria-label="Previous">‹</button>
        <div className="dot-group" style={{ display: 'inline-flex', gap: 6 }}>
          {items.map((_, i) => <div key={i} className={`dot ${index === i ? 'active' : ''}`} />)}
        </div>
        <button className="btn btn-primary" onClick={onNext} aria-label="Next">›</button>
      </div>
    </div>
  );
}

function ImageModal({ item, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" onClick={(e)=>e.stopPropagation()}>
        <div className="modal-header">
          <strong>{item.title}</strong>
          <button className="btn" onClick={onClose}>Close</button>
        </div>
        <div className="modal-body">
          <div style={{ borderRadius: 12, overflow: 'hidden' }}>
            <img src={item.img} alt={item.title} />
          </div>
          <p className="muted" style={{ marginTop: 8 }}>
            Category: <strong>{item.category}</strong>
          </p>
          <button className="btn" onClick={() => window.location.hash = '#order'}>Order Similar</button>
        </div>
      </div>
    </div>
  );
}

function OrderForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    product: 'Belgian Chocolate Cake',
    message: '',
  });

  const [sending, setSending] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (channel) => {
    if (!form.name || !form.product) {
      alert('Please provide your name and desired product.');
      return;
    }
    setSending(true);
    try {
      await new Promise(r => setTimeout(r, 250)); // simulate small delay
      onSubmit({ ...form, channel });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="card" style={{ padding: 16 }}>
      <div className="form-grid">
        <div>
          <label className="label">Name</label>
          <input className="input" name="name" value={form.name} onChange={update} placeholder="Your full name" />
        </div>
        <div>
          <label className="label">Email</label>
          <input className="input" name="email" value={form.email} onChange={update} placeholder="name@example.com" />
        </div>
        <div>
          <label className="label">Phone</label>
          <input className="input" name="phone" value={form.phone} onChange={update} placeholder="+1 555 123 4567" />
        </div>
        <div>
          <label className="label">Product</label>
          <select className="select" name="product" value={form.product} onChange={update}>
            <option>Belgian Chocolate Cake</option>
            <option>Amber Crunch Cupcakes (Box of 6)</option>
            <option>Silk Truffle Box</option>
            <option>Custom Cake</option>
          </select>
        </div>
        <div className="span-2">
          <label className="label">Message</label>
          <textarea className="textarea" rows="4" name="message" value={form.message} onChange={update} placeholder="Theme, size, date, and any notes…" />
        </div>
      </div>
      <hr className="divider" />
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button disabled={sending} className="btn btn-primary" onClick={() => submit('whatsapp')}>{sending ? 'Sending…' : 'Send via WhatsApp'}</button>
        <button disabled={sending} className="btn" onClick={() => submit('email')}>{sending ? 'Sending…' : 'Send via Email'}</button>
      </div>
    </div>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid md-3" style={{ gap: 16 }}>
          <div className="card" style={{ padding: 16 }}>
            <div className="brand" style={{ marginBottom: 10 }}>
              <div className="brand-logo" />
              <div>
                <div className="brand-name">The Chocolate Drop</div>
                <div className="brand-sub">Premium Imported Chocolate</div>
              </div>
            </div>
            <p className="muted">Crafting modern cakes and desserts with luxurious chocolate since 2016.</p>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <h4 style={{ margin: '0 0 10px 0' }}>Contact</h4>
            <div className="grid" style={{ gap: 6 }}>
              <div><strong>Email:</strong> orders@chocolatedrop.example</div>
              <div><strong>Phone:</strong> +1 (555) 987-6543</div>
              <div><strong>Address:</strong> 123 Cocoa Ave, Suite 5</div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              <a className="btn" href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
              <a className="btn" href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            </div>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <h4 style={{ margin: '0 0 10px 0' }}>Navigate</h4>
            <div className="grid" style={{ gap: 8 }}>
              <a className="nav-link" href="#highlights" onClick={(e)=>{e.preventDefault();onNavigate('highlights')}}>About</a>
              <a className="nav-link" href="#specials" onClick={(e)=>{e.preventDefault();onNavigate('specials')}}>Specials</a>
              <a className="nav-link" href="#gallery" onClick={(e)=>{e.preventDefault();onNavigate('gallery')}}>Gallery</a>
              <a className="nav-link" href="#testimonials" onClick={(e)=>{e.preventDefault();onNavigate('testimonials')}}>Reviews</a>
              <a className="nav-link" href="#order" onClick={(e)=>{e.preventDefault();onNavigate('order')}}>Order</a>
            </div>
          </div>
        </div>
        <div className="text-center muted" style={{ marginTop: 20, fontSize: 12 }}>
          © {new Date().getFullYear()} The Chocolate Drop · All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function Hero({ onOrderClick }) {
  return (
    <section id="business" className="hero">
      <div className="container">
        {/* visual separation handled in Highlights section */}
      </div>
    </section>
  );
}

function FabOrder({ onClick }) {
  return (
    <button className="fab" onClick={onClick} aria-label="Quick order">
      <span aria-hidden>🛍️</span> Order
    </button>
  );
}

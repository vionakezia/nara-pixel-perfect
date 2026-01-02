import { Link } from "react-router-dom";
import fountainPenImage from "@/assets/fountain-pen-ink.png";

const Guidelines = () => {
  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <header className="page-header">
        <div className="page-header-logo">
          <Link to="/" className="logo-circle">N</Link>
        </div>
        <h1 className="page-header-title" style={{ textTransform: 'none', letterSpacing: 'normal' }}>
          Community Guidelines
        </h1>
      </header>

      {/* Content */}
      <main className="container">
        <div className="guidelines-content">
          <div className="guidelines-left">
            <div className="guideline-section">
              <h2 className="guideline-title">1. Saling Menghormati</h2>
              <ul className="guideline-list">
                <li>Gunakan bahasa yang sopan dan tidak merendahkan.</li>
                <li>Hormati perbedaan pendapat, gaya menulis, dan latar belakang pengguna lain.</li>
                <li>Dilarang melakukan perundungan (bullying), ujaran kebencian, pelecehan, atau intimidasi dalam bentuk apa pun.</li>
              </ul>
            </div>

            <div className="guideline-section">
              <h2 className="guideline-title">2. Ekspresi yang Aman dan Bertanggung Jawab</h2>
              <ul className="guideline-list">
                <li>Tulisan harus merupakan karya asli atau diberi kredit jika mengutip.</li>
                <li>Dilarang menyebarkan konten berbahaya, kekerasan, atau eksploitasi.</li>
                <li>Hindari konten yang bersifat sensitif tanpa peringatan yang jelas.</li>
              </ul>
            </div>

            <div className="guideline-section">
              <h2 className="guideline-title">3. Privasi dan Keamanan</h2>
              <ul className="guideline-list">
                <li>Jangan membagikan informasi pribadi orang lain tanpa izin.</li>
                <li>Lindungi akun Anda dan jangan bagikan kata sandi.</li>
              </ul>
            </div>
          </div>
          <div className="guidelines-right">
            <img 
              src={fountainPenImage} 
              alt="Fountain pen with ink splash" 
              className="hero-image"
              style={{ maxWidth: '350px' }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Guidelines;

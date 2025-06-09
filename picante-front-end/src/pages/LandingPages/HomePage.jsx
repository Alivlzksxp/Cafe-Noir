import React, { useState, useEffect } from 'react';
import '../../styles/Homepage.css';

// Image assets
import coffeeBg from '../../assets/coffee.jpg';
import pastryBg from '../../assets/pastry.jpg';
import cakeBg from '../../assets/cake.jpg';
import cafeLook from '../../assets/cafeLook.jpg';

import berryMatcha from '../../assets/berryMatcha.jpg';
import caramelMacchiato from '../../assets/caramelMacchiato.jpg';
import chocolateFudgeBrownie from '../../assets/chocolateFudgeBrownie.jpg';
import earlGreyLavenderTea from '../../assets/earlGreyLavenderTea.jpg';
import spicedHazelnut from '../../assets/spicedHazelnut.jpg';
import vanillaBean from '../../assets/vanillaBean.jpg';
import glazedDonut from '../../assets/glazedDonut.jpg';
import sliceOfCake from '../../assets/sliceOfCake.jpg';

// Graphics for hero section
import coffeeGraphic from '../../assets/coffee.png';
import nonCoffeeGraphic from '../../assets/non-coffee.png';
import teaGraphic from '../../assets/tea.png';
import dessertGraphic from '../../assets/dessert.png';

// Icons for menus
import papercupIcon from '../../assets/papercupIcon.png';
import nonCoffeeIcon from '../../assets/noncoffeeIcon.png';
import teaIcon from '../../assets/teaIcon.png';
import dessertIcon from '../../assets/dessertIcon.png';

function HomePage() {
  const [mainImage, setMainImage] = useState(coffeeGraphic);
  const [smallImages, setSmallImages] = useState([nonCoffeeGraphic, teaGraphic, dessertGraphic]);

  const itemData = [
        {
            name: 'Coffee',
            image: coffeeGraphic,
            strip1: `LATTE <img src="${papercupIcon}" alt="Cup" class="coffee-icon" /> ESPRESSO <img src="${papercupIcon}" alt="Cup" class="coffee-icon" /> MOCHA <img src="${papercupIcon}" alt="Cup" class="coffee-icon" /> MACCHIATO <img src="${papercupIcon}" alt="Cup" class="coffee-icon" /> CAPPUCCINO`,
            strip2: `DOPPIO <img src="${papercupIcon}" alt="Cup" class="coffee-icon" /> GALAO <img src="${papercupIcon}" alt="Cup" class="coffee-icon" /> AMERICANO <img src="${papercupIcon}" alt="Cup" class="coffee-icon" /> FLAT WHITE`,
            icon: papercupIcon
        },
        {
            name: 'Non-Coffee',
            image: nonCoffeeGraphic,
            strip1: `MILKSHAKE <img src="${nonCoffeeIcon}" alt="Non-Coffee" class="coffee-icon" /> FRAPPE <img src="${nonCoffeeIcon}" alt="Non-Coffee" class="coffee-icon" /> HOT CHOCO <img src="${nonCoffeeIcon}" alt="Non-Coffee" class="coffee-icon" /> MILKTEA <img src="${nonCoffeeIcon}" alt="Non-Coffee" class="coffee-icon" /> SMOOTHIE`,
            strip2: `CHOCOLATE <img src="${nonCoffeeIcon}" alt="Non-Coffee" class="coffee-icon" /> VANILLA <img src="${nonCoffeeIcon}" alt="Non-Coffee" class="coffee-icon" /> STRAWBERRY <img src="${nonCoffeeIcon}" alt="Non-Coffee" class="coffee-icon" /> CARAMEL <img src="${nonCoffeeIcon}" alt="Non-Coffee" class="coffee-icon" />`,
            icon: nonCoffeeIcon
        },
        {
            name: 'Tea',
            image: teaGraphic,
            strip1: `BLACK TEA <img src="${teaIcon}" alt="Leaf" class="coffee-icon" /> GREEN TEA <img src="${teaIcon}" alt="Leaf" class="coffee-icon" /> OOLONG <img src="${teaIcon}" alt="Leaf" class="coffee-icon" /> CHAMOMILE <img src="${teaIcon}" alt="Leaf" class="coffee-icon" /> EARL GREY`,
            strip2: `JASMINE <img src="${teaIcon}" alt="Leaf" class="coffee-icon" /> MINT <img src="${teaIcon}" alt="Leaf" class="coffee-icon" /> HERBAL <img src="${teaIcon}" alt="Leaf" class="coffee-icon" /> CITRUS <img src="${teaIcon}" alt="Leaf" class="coffee-icon" /> WHITE TEA`,
            icon: teaIcon
        },
        {
            name: 'Dessert',
            image: dessertGraphic,
            strip1: `CAKE <img src="${dessertIcon}" alt="Dessert" class="coffee-icon" /> CROISSANT <img src="${dessertIcon}" alt="Dessert" class="coffee-icon" /> TART <img src="${dessertIcon}" alt="Dessert" class="coffee-icon" /> PASTRY <img src="${dessertIcon}" alt="Dessert" class="coffee-icon" /> COOKIE`,
            strip2: `BROWNIE <img src="${dessertIcon}" alt="Dessert" class="coffee-icon" /> DONUT <img src="${dessertIcon}" alt="Dessert" class="coffee-icon" /> MOCHI <img src="${dessertIcon}" alt="Dessert" class="coffee-icon" /> MACARON <img src="${dessertIcon}" alt="Dessert" class="coffee-icon" /> PIES`,
            icon: dessertIcon
        }
    ];

    const [stripText, setStripText] = useState({ strip1: itemData[0].strip1, strip2: itemData[0].strip2 });

    const handleImageChange = (index) => {
        const newMain = smallImages[index];
        setSmallImages(prev => prev.map((img, i) => (i === index ? mainImage : img)));
        setMainImage(newMain);

        const matched = itemData.find(it => it.image === newMain);
        if (matched) {
        setStripText({ strip1: matched.strip1, strip2: matched.strip2 });
        }
    };

    const signatureMenu = [
        { name: 'Spiced Hazelnut Latte', desc: 'Rich espresso with roasted hazelnuts and cinnamon.', photo: spicedHazelnut },
        { name: 'Vanilla Bean Cold Brew', desc: 'Smooth cold brew sweetened with vanilla bean syrup.', photo: vanillaBean },
        { name: 'Berry Matcha Smoothie', desc: 'Fresh berries meet premium matcha for a vibrant boost.', photo: berryMatcha },
        { name: 'Caramel Macchiato', desc: 'Espresso layered with steamed milk and caramel drizzle.', photo: caramelMacchiato },
        { name: 'Earl Grey Lavender Tea', desc: 'Classic bergamot tea with a hint of lavender.', photo: earlGreyLavenderTea },
        { name: 'Chocolate Fudge Brownie', desc: 'Decadent brownie with a gooey fudge center, served warm.', photo: chocolateFudgeBrownie },
        { name: 'Glazed Donut', desc: 'Soft donut with sweet glaze and sprinkles.', photo: glazedDonut },
        { name: 'Slice of Cake', desc: 'Moist cake slice with creamy frosting.', photo: sliceOfCake },
    ];

  return (
    <div className="homepage">
      <section className="hero-section">
        <div className="hero-content">
        <h1 className="hero-title-top">SAVOR</h1>
        <h1 className="hero-title-bottom">THE MOMENT</h1>

          <div className="hero-circle-group">
            <div className="hero-circle" />
            <img
              src={mainImage}
              alt="Selected Drink"
              className={`hero-coffee-image ${
                mainImage === coffeeGraphic ? 'hero-coffee-img' :
                mainImage === nonCoffeeGraphic ? 'hero-noncoffee-img' :
                mainImage === teaGraphic ? 'hero-tea-img' :
                'hero-dessert-img'}
              `}
            />
            <div className="hero-small-circles">
              {smallImages.map((img, idx) => (
                <div key={idx} className="small-circle" onClick={() => handleImageChange(idx)}>
                  <img src={img} alt={`Option ${idx + 1}`} className="circle-img" />
                </div>
              ))}
            </div>
            <div className="hero-strip-overlay" />
            <div className="hero-strip-overlay-second" />
            <div 
                className="hero-strip-text hero-strip-text-first"
                dangerouslySetInnerHTML={{ __html: stripText.strip1 }}
                />
                            <div 
                className="hero-strip-text hero-strip-text-second"
                dangerouslySetInnerHTML={{ __html: stripText.strip2 }}
                />
          </div>
        </div>
        <div className="hero-bottom-strip" />
      </section>

        <section className="signature-menu">
        <div className="signature-menu-header">
            <h2>Our Signature Menu</h2>
            <p className="signature-menu-subtitle">Crafted with passion, brewed with heart.</p>
        </div>
        <div className="signature-menu-grid">
            {signatureMenu.map((item, i) => (
            <div className="menu-card" key={i}>
                <div className="menu-photo-wrapper">
                <img src={item.photo} alt={item.name} />
                </div>
                <div className="menu-info">
                <h3 className="menu-name">{item.name}</h3>
                <p className="menu-desc">{item.desc}</p>
                </div>
            </div>
            ))}
        </div>
        </section>

        <section className="info-section">
        <div className="info-container">
            <h2>Visit Our Café</h2>
            <p className="info-subtitle">A space to slow down, sip, and connect.</p>
            <div className="info-wrapper">
            <div className="info-image">
                <img src={cafeLook} alt="Cafe Exterior" />
            </div>
            <div className="info-content">
                <h3><i className="fas fa-map-marker-alt"></i> Our Location</h3>
                <ul>
                <li>123 Brew Lane, Manila, Philippines</li>
                <li>Mon – Sat: 8:00 AM – 9:00 PM</li>
                <li>Sunday: 10:00 AM – 6:00 PM</li>
                <li>Tel: (02) 555-COFFEE</li>
                </ul>
                <div className="info-divider"></div>
                <p className="info-message">
                Whether you're on the go or staying for a while, our doors are open for coffee, comfort, and community.
                </p>
            </div>
            </div>
        </div>
        </section>

    </div>
  );
}

export default HomePage;

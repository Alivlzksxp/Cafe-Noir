import React, { useState, useEffect } from 'react';
import '../../styles/About.css';
import aboutImage from '../../assets/cafe-about.jpg';
import founderImage from '../../assets/cafe-founder.jpg';
import teamMember1 from '../../assets/team-member1.jpg';
import teamMember2 from '../../assets/team-member2.jpg';
import teamMember3 from '../../assets/team-member3.jpg';

function AboutPage() {
  return (
    <div className="about-page">
    <section className="about-hero" style={{ backgroundImage: `url(${aboutImage})` }}>
        <div className="about-overlay">
        <div className="about-textbox">
            <h1>More Than a Café</h1>
            <p>Rooted in purpose. Brewed for connection. A neighborhood tradition with a story in every cup.</p>
        </div>
        <div className="scroll-hint">↓</div>
        </div>
    </section>

    <section className="story-section section-light">
    <div className="container story-content">
        <div className="story-header">
        <h2>Our Journey</h2>
        <span className="story-subtitle">A story brewed with care and connection</span>
        <hr />
        </div>
        <div className="story-body">
        <p>
            In 2023, <strong>Café Noir</strong> started as a heartfelt dream: a cozy place where neighbors become friends and coffee brings people together. Even as we have grown, our spirit remains grounded in community, sustainability, and the art of Filipino coffee.
        </p>
        <p>
            Every cup tells a story from the hardworking farmers in provinces like Benguet and Batangas, to the roasters, baristas, and guests. Our love for small batch roasting, responsible sourcing, and warm Filipino hospitality guides every moment we serve.
        </p>
        </div>
    </div>
    </section>

    <section className="founder-section section-dark">
    <div className="container founder-content">
        <div className="founder-image-wrapper">
        <img src={founderImage} alt="Founder Emily Rodriguez" className="founder-image" />
        </div>
        <div className="founder-text">
        <h2>The Heart Behind the Brew</h2>
        <p>
            Meet <strong>Emily Rodriguez</strong>, a passionate advocate for Filipino coffee farmers and a dedicated coffee artisan. Inspired by the rich coffee growing regions of the Philippines such as Benguet and Batangas, she envisions a café that celebrates local heritage and craftsmanship.
        </p>
        <p>
            Café Noir is her tribute to Filipino hospitality and sustainability where every cup tells a story of hardworking farmers and proud traditions. Her mission is to serve not just coffee but also community culture and a true Filipino sense of warmth.
        </p>
        <div className="founder-signature">
            <span>— Emily R.</span>
        </div>
        </div>
    </div>
    </section>


    <section className="values-section section-light">
    <div className="container">
        <h2>What We Believe In</h2>
        <div className="values-grid">
        <div className="value-card">
            <div className="value-icon-wrapper">
            <div className="value-icon">☕️</div>
            </div>
            <h3>Passion for Quality</h3>
            <p>Each cup is brewed with care using the finest local and Philippine-grown beans.</p>
        </div>
        <div className="value-card">
            <div className="value-icon-wrapper">
            <div className="value-icon">🌱</div>
            </div>
            <h3>Respect for Nature</h3>
            <p>We work with partners who care for the environment and support sustainable farming.</p>
        </div>
        <div className="value-card">
            <div className="value-icon-wrapper">
            <div className="value-icon">🤝</div>
            </div>
            <h3>Community Connection</h3>
            <p>Café Noir is your neighborhood gathering place, a warm and welcoming part of your day.</p>
        </div>
        </div>
    </div>
    </section>
    <section className="team-section section-dark">
    <div className="container">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
        {[{
            img: teamMember1, 
            name: "Ava Lee", 
            role: "Lead Barista", 
            desc: "With over 7 years in specialty coffee, Ava pours each cup with care and skill, creating moments of joy in every sip."
        }, {
            img: teamMember2, 
            name: "Jordan Cruz", 
            role: "Community Coordinator", 
            desc: "Jordan connects Café Noir with the community, organizing events and fostering friendships over every cup."
        }, {
            img: teamMember3, 
            name: "Maya Tan", 
            role: "Roastmaster", 
            desc: "Maya carefully selects and roasts each bean, making sure every batch tells the story of Filipino coffee traditions."
        }].map((member, index) => (
            <div className="team-card" key={index}>
            <div className="team-card-image">
                <img src={member.img} alt={member.name} />
            </div>
            <div className="team-card-content">
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="desc">{member.desc}</p>
            </div>
            </div>
        ))}
        </div>
    </div>
    </section>

    </div>
  );
}

export default AboutPage;

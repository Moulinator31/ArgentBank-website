import '../styles/main.css'

function FeatureCard({ picture, tittle, description, descriptionPicture }) {
  return <div className="feature-item">
    <img src={picture} alt={descriptionPicture} className="feature-icon" />
    <h3 className="feature-item-title">{tittle}</h3>
    <p>
      {description}
    </p>
  </div>

};

export default FeatureCard;
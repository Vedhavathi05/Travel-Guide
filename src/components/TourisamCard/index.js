import './index.css'

const TorisamCard = props => {
  const {details} = props
  console.log(details.name)
  const {name, description, imageUrl} = details
  console.log(name)
  return (
    <div className="tourisam-card">
      <img src={imageUrl} alt={name} className="image-styling" />
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  )
}

export default TorisamCard

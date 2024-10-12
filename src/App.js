import {Component} from 'react'

import Loader from 'react-loader-spinner'

import TourisamCard from './components/TourisamCard'

import './App.css'

class App extends Component {
  state = {
    statusOf: 'INITIAL',
    touristList: [],
  }

  componentDidMount() {
    this.callApi()
  }

  callApi = async () => {
    this.setState({statusOf: 'PROGRESS'})
    const url = 'https://apis.ccbp.in/tg/packages'

    const response = await fetch(url)
    const data = await response.json()
    const updatedList = data.packages.map(each => ({
      id: each.id,
      description: each.description,
      imageUrl: each.image_url,
      name: each.name,
    }))

    this.setState({touristList: updatedList, statusOf: 'SUCCESS'})
  }

  renderCorrectView = () => {
    const {statusOf} = this.state
    switch (statusOf) {
      case 'PROGRESS':
        return this.renderProgressView()
      case 'SUCCESS':
        return this.renderSuccessView()

      default:
        return null
    }
  }

  renderProgressView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {touristList} = this.state
    return (
      <ul className="ul-container">
        {touristList.map(each => (
          <li key={each.id}>
            <TourisamCard details={each} key={each.id} />
          </li>
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="main-container">
        <h1>Travel Guide</h1>
        {this.renderCorrectView()}
      </div>
    )
  }
}

export default App

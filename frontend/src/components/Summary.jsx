import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Amenities } from './Amenities'
import styled from 'styled-components'
import { LeftArrow } from './LeftArrow'
import Loading from '/loading.gif'

const StyledSummary = styled.div`
  background-color: white;
  border-radius: 20px;
  margin: 5px;
  padding: 10px 3px;
  position: relative;

  svg {
    padding: 5px;
    background-color: #ffffffa7;
    width: 30px;
    height: 30px;
    border-radius: 50px;
    text-align: center;
    position: absolute;
    top: 5%;
    left: 10%;
    z-index: 20;
    &:hover path {
      fill: black;
    }
    &:hover {
      background-color: white;
      transition: width 2s ease-in-out, height 2s ease-in-out,
        background-color 2s ease-in-out;
    }
  }
  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  p {
    border-bottom: 1px solid #e0e0e0;
    font-size: 1rem;
    margin-bottom: 10px;
  }

  h5 {
    font-size: 1rem;
    margin-bottom: 10px;
  }

  .host {
    display: flex;
    margin-bottom: 10px;
    justify-content: center;
    align-items: flex-end;
    img {
      width: 30px;
      height: 30px;
    }
    span {
      font-size: 0.9rem;
      padding-left: 20px;
      white-space: nowrap;
    }
  }

  .USP {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    align-items: center;

    img {
      width: 30px;
      height: 30px;
    }
    span {
      font-size: 0.9rem;
      padding-left: 20px;
    }
  }
  .containerUsp {
    display: flex;
    gap: 15px;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #e0e0e0;
  }

  display: flex;
  box-sizing: border-box;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  .content {
    padding: 20px;
    color: black;
  }
  .mainpic {
    object-fit: cover;
    width: 90vw;
    border-radius: 20px;
    height: 300px;
  }
  @media (min-width: 669px) and (max-width: 1024px) {
    .mainpic {
      width: 40vw;
      object-fit: cover;
      border-radius: 20px;
      height: auto;
    }
    margin: 10px;
    padding: 20px 5px;
    svg {
      top: 5%;
      left: 35%;
      width: 40px;
      height: 40px;
    }
  }

  @media (min-width: 1024px) {
    .mainpic {
      width: 30vw;
      object-fit: cover;
      border-radius: 20px;
      height: auto;
    }
    svg {
      width: 50px;
      height: 50px;
      top: 8%;
      left: 35%;
    }
    margin: 40px;
    padding: 50px 20px;
  }
`

export const Summary = () => {
  const { accommodation } = useParams()

  const [accommodationDetails, setAccommodationDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  // fetching with get request the accommodation details specifically for the id, the accomodation id it's a query parameter
  useEffect(() => {
    if (!accommodation) return // Make sure accommodationId is available

    setLoading(true)
    fetch(
      `https://project-express-api-7pjc.onrender.com/accommodations/${accommodation}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAccommodationDetails(data)

        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching accommodation details:', error)
        setLoading(false)
      })
  }, [accommodation])

  if (loading)
    return <img className="loadingGif" src={Loading} alt="loading-gif" />
  if (!accommodationDetails) return <div>No accommodation details found.</div>

  return (
    <StyledSummary>
      {/* arrow button to go back to home */}
      <Link to="/">
        <LeftArrow />
      </Link>
      <img
        src={accommodationDetails.image}
        alt="accommodation-image"
        className="mainpic"
      />

      <div className="content">
        <h2>{accommodationDetails.name}</h2>
        <p>{accommodationDetails.description}</p>
        <h5>{accommodationDetails.neighbourhood}</h5>
        <div className="containerUsp">
          <div className="host">
            <img src="/host-icon.png" alt="host-icon" />
            <span> Host: {accommodationDetails.host_name}</span>
          </div>
          <div className="USP">
            <img src="/star-icon.png" alt="star" />

            <span>{accommodationDetails.rating}</span>
          </div>
        </div>
        <Amenities amenities={accommodationDetails.amenities} />
      </div>
    </StyledSummary>
  )
}

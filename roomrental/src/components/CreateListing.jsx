import React from 'react'
import '../styles/CreateListing.scss'
import { categories, types } from '../data'
import Navbar from './Navbar'

const CreateListing = () => {
    return (
        <>
        < Navbar />
        <div className="create-listing">
            <h1>Publish your place</h1>
            <form action="">
                <div className="create-listing_step1">
                    <h2>Step1: Tell us about your place</h2>
                    <hr />
                    <h3>Which of these categories best describes your place?</h3>
                    <div className="category-list">
                        {categories?.map ((item,index)=> (
                            <div className="category" key= {index}>
                                <div className="category_icon"> {React.createElement (item.icon)}</div>
                                <p>{item.label}</p>
                            </div>
                        ))}
                    </div>

                    <h3>What type of place will guest have?</h3>
                    <div className="type-list">
                        {types?.map ((item,index) =>  (
                            <div className="type" key= {index}>
                                <div className="type_text">
                                    <h4>{item.name}</h4>
                                    <p>{item.description}</p>
                                </div>
                                <div className="type_icon">{React.createElement(item.icon)}</div>
                            </div>
                        ))}
                    </div>  

                    <h3>Where's your place located?</h3>
                    <div className="full">
                        <div className="location">
                            <p>Street Address</p>
                            <input type="text" placeholder='Street Address' name='streetAddress' required />
                        </div>
                    </div>

                    <div className="half">
                        <div className="location">
                            <p>Apartment, Suite, etc</p>
                            <input type="text" placeholder='Apartment, Suite, etc' name='aptSuite' required />
                        </div>
                        <div className="location">
                            <p>City</p>
                            <input type="text" placeholder='City' name='city' required />
                        </div>
                    </div>
                    <div className="half">
                        <div className="location">
                            <p>Province</p>
                            <input type="text" placeholder='Province' name='province' required />
                        </div>
                        <div className="location">
                            <p>Country</p>
                            <input type="text" placeholder='Country' name='country' required />
                        </div>
                    </div>

                </div>
            </form>
        </div>
        </>
    )
}

export default CreateListing
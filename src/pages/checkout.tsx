import React from "react"
import Layout from "../theme/Layout"
import Checkout from "../modules/Checkout"



const SignUp = () => {

  return (
    
    <Layout canonical="/signup" description="Gain access to standalone, cloud hosted test instances to deploy your application." title="Sign Up for Frosti">
      <div className="product">
        <div className="description">
          <h3>Beta Plan</h3>
          <h5>$10.00</h5>
        </div>
        <Checkout />
      </div>
    </Layout>
  )
}

export default SignUp

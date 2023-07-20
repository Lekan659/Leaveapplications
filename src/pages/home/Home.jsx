import './home.css'
import Features from '../../components/features/Features'
import Charts from '../../components/charts/Charts'
import { userData } from '../../dummyData'
import WidgetSm from '../../components/widgetSm/WidgetSm'
import WidgetLg from '../../components/widgetLg/WidgetLg'
import { withConfirmationDialog} from '../../utils'
import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';

function Home() {
  const[authvalues, setAuthValues] = useState(localStorage.getItem('ishead'))
  const[authvaluessuper, setAuthValuessuper] = useState(localStorage.getItem('issuperuser'))

  // const autorizationnewuser = () => {
  //   if (authvaluessuper === "true")
  //     return    <Charts data={userData} title="User Analytics" grid dataKey="Available"/>

  //   else{
  //   }
  // }

    const autorizationnewuser = () => {
    if (authvaluessuper === "true")
      return    <WidgetSm/>

    else{
    }
  }
  return (
    <div className='home'>
        <Features/>
        
        <div className="homeWidgets">
        {autorizationnewuser()}
          <WidgetLg/>
        </div>
    </div>
  )
}

export default withConfirmationDialog(withRouter(Home))

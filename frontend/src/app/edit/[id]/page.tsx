"use client";
import { getTrip } from '@/ApiRequests/Trips';
import TripForm from '@/components/TripForm';
import { popupHelper } from '@/helper/Popup';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function Page() {
    const params = useParams();
    const [trip, setTrip] = useState({
        title: '',
        destination: '',
        budget: 0,
        days: 0
    });
    useEffect(() => {
        const fetchData = async() => {
            const id = typeof params.id === 'string' ? params.id : '';
            const resp = await getTrip({ id });
            if (resp?.error)
                popupHelper({ error: resp.error, message: resp.message })
            setTrip(resp?.trip);
        }
        fetchData();
    },[params])
    return (
      <>
        <TripForm initialValues={trip} />
      </>
  )
}

export default Page
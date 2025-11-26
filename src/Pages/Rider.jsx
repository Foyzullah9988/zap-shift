import React, { use } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { AuthContext } from '../Context/AuthProvider';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import {
    useLoaderData,
    // useNavigate
} from 'react-router';
import Swal from 'sweetalert2';

const Rider = () => {
    const {
        register,
        handleSubmit,
        control
    } = useForm();
    const { user } = use(AuthContext);
    const axiosSecure = useAxiosSecure();
    // const navigate = useNavigate()
    const warhorses = useLoaderData();
    const regionOptions = warhorses.map(wh => wh.region);
    // console.log(regionOptions);
    const regions = [...new Set(regionOptions)]
    // console.log(regions);
    const region = useWatch({ control, name: 'region' });

    const handleRiderApplication = (data) => {
        console.log(data);


        // save the parcel into database
        axiosSecure.post('/riders', data)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Application Submitted",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                // navigate(`/dashboard/my-parcels`)
            })
    }

    const districtsByRegion = (region) => {
        const regionDistricts = warhorses.filter(w => w.region === region);
        // console.log(regionDistricts);
        const districts = regionDistricts.map(rd => rd.district)
        // console.log(districts);
        return districts
    }

    return (

        <div>
            <h2 className="text-4xl">Be a Rider</h2>
            <form
                onSubmit={handleSubmit(handleRiderApplication)}
                className='mt-5'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-5'>
                    {/* rider */}
                    <div className='space-y-2'>
                        <h3 className="text-2xl">Your Information</h3>
                        {/* name */}
                        <fieldset className="fieldset">
                            <label className="label text-black" >Your Name</label>
                            <input type="text" {...register('name')} defaultValue={user?.displayName} className="input w-full" placeholder="Rider Name" />
                            {/* email */}
                            <label className="label text-black">Your Email</label>
                            <input type="email" {...register('email')} defaultValue={user?.email} className="input w-full" placeholder="Your Email" />
                            {/* region */}
                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend">Your Region</legend>
                                <select {...register('region')} defaultValue="Pick a Region" className="select">
                                    <option >Pick a region</option>
                                    {
                                        regions.map((region, i) => <option key={i} value={region}>{region}</option>)
                                    }
                                </select>
                                {/* <span className="label">Optional</span> */}
                            </fieldset>
                            {/* Districts */}
                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend">Your District</legend>
                                <select {...register('district')} defaultValue="Pick a District" className="select">
                                    <option >Pick a district</option>
                                    {
                                        districtsByRegion(region).map((region, i) => <option className='text-black' key={i} value={region}>{region}</option>)
                                    }
                                </select>
                                {/* <span className="label">Optional</span> */}
                            </fieldset>

                            {/* Address */}
                            <label className="label text-black">Your Address</label>
                            <input type="text" {...register('address')} className="input w-full" placeholder="Your Address" />
                            {/* Number */}
                            <label className="label text-black">Your Mobile Number</label>
                            <input type="number" {...register('mobileNumber')} className="input w-full" placeholder="Your Phone Number" />
                        </fieldset>
                    </div>
                    <div className='space-y-2'>
                        <h3 className="text-2xl">More Details</h3>
                        {/* name */}
                        <fieldset className="fieldset">
                            <label className="label text-black">Driving License</label>
                            <input type="text" {...register('license')} className="input w-full" placeholder="Driving License No." />
                            {/* email */}
                            <label className="label text-black">NID</label>
                            <input type="number" {...register('nid')} className="input w-full" placeholder="NID Number" />
                        </fieldset>
                    </div>
                </div>
                <input type="submit" value="Apply For A Rider" className='btn mt-3 btn-primary justify-end text-black' />
            </form>
        </div>
    );
};

export default Rider;
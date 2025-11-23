import React, { use } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Context/AuthProvider';

const SendParcel = () => {

    const {
        register,
        handleSubmit,
        control
    } = useForm();
const {user} = use(AuthContext)    
    const axiosSecure = useAxiosSecure();
    const warhorses = useLoaderData();
    // console.log(warhorses);
    const regionOptions = warhorses.map(wh => wh.region);
    // console.log(regionOptions);
    const regions = [...new Set(regionOptions)]
    // console.log(regions);
    const senderRegion = useWatch({ control, name: 'senderRegion' });
    const receiverRegion = useWatch({ control, name: 'receiverRegion' });

    const districtsByRegion = (region) => {
        const regionDistricts = warhorses.filter(w => w.region === region);
        // console.log(regionDistricts);
        const districts = regionDistricts.map(rd => rd.district)
        // console.log(districts);
        return districts
    }


    const handleSendParcel = (data) => {
        // console.log(data);
        const sameDistrict = data.senderDistricts === data.receiverDistricts;
        // console.log(sameDistrict);
        const isDocument = data.parcelType === "document"
        const parcelWeight = Number(data.parcelWeight)
        let cost = 0;
        if (isDocument) {
            cost = sameDistrict ? 60 : 80
        } else {
            if (parcelWeight <= 3) {
                cost = sameDistrict ? 110 : 150
            } else {
                const minCharge = sameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = sameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
                cost = minCharge + extraCharge;
            }
        }
        console.log(cost);
        data.cost = cost
        Swal.fire({
            title: "Agree with the cost?",
            text: `You have to pay ${cost} taka`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, confirm it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // save the parcel into database
                axiosSecure.post('/parcels',data)
                .then(res=>{
                    console.log(res.data);
                })

                Swal.fire({
                    title: "Confirmed!",
                    text: "Your file has been confirm.",
                    icon: "success"
                });
            }
        });
    }

    return (
        <div className='text-black'>
            <h2 className='text-5xl'>Send a Parcel</h2>
            <form onSubmit={handleSubmit(handleSendParcel)} className='mt-5'>
                <div className='flex gap-8'>
                    {/* document */}
                    <div>
                        <label>
                            <input type="radio" {...register('parcelType')} name="parcelType" value="document" className='radio' />
                            Document</label>
                    </div>
                    {/* parcel */}
                    <div>
                        <label>
                            <input type="radio" {...register('parcelType')} className='radio' name="parcelType" value="parcel" />
                            Non-Document</label>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 my-2 mt-5 gap-10'>
                    <fieldset className="fieldset">
                        <label className="label text-black">Parcel Name</label>
                        <input type="text" {...register('parcelName')} className="input w-full" placeholder="Parcel Name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label text-black">Parcel Weight</label>
                        <input type="number" {...register('parcelWeight')} className="input w-full" placeholder="Parcel Weight" />
                    </fieldset>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-5'>
                    {/* sender */}
                    <div className='space-y-2'>
                        <h3 className="text-2xl">Sender Details</h3>
                        {/* name */}
                        <fieldset className="fieldset">
                            <label className="label text-black" >Sender Name</label>
                            <input type="text" {...register('senderName')} value={user?.displayName} className="input w-full" placeholder="Sender Name" />
                            {/* email */}
                            <label className="label text-black">Sender Email</label>
                            <input type="email" {...register('senderEmail')} value={user?.email} className="input w-full" placeholder="Sender Email" />
                            {/* region */}
                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend">Sender Region</legend>
                                <select {...register('senderRegion')} defaultValue="Pick a Region" className="select">
                                    <option >Pick a region</option>
                                    {
                                        regions.map((region, i) => <option key={i} value={region}>{region}</option>)
                                    }
                                </select>
                                {/* <span className="label">Optional</span> */}
                            </fieldset>
                            {/* Districts */}
                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend">Sender District</legend>
                                <select {...register('senderDistricts')} defaultValue="Pick a District" className="select">
                                    <option >Pick a district</option>
                                    {
                                        districtsByRegion(senderRegion).map((region, i) => <option className='text-black' key={i} value={region}>{region}</option>)
                                    }
                                </select>
                                {/* <span className="label">Optional</span> */}
                            </fieldset>

                            {/* Address */}
                            <label className="label text-black">Address</label>
                            <input type="text" {...register('senderAddress')} className="input w-full" placeholder="Sender Address" />
                            {/* Number */}
                            <label className="label text-black">Number</label>
                            <input type="number" {...register('senderNumber')} className="input w-full" placeholder="Sender Phone Number" />
                            {/* District */}
                            {/* <label className="label text-black">District</label>
                            <input type="text" {...register('senderDistrict')} className="input w-full" placeholder="Sender District" /> */}
                            {/* Pickup Instruction */}
                            <label className="label text-black">Pickup Instruction</label>
                            <textarea type="text" {...register('senderInstruction')} className="input w-full h-24" rows='9' cols='50' placeholder="Pickup Instruction" />
                        </fieldset>
                    </div>
                    {/* receiver  details*/}
                    <div className='space-y-2'>
                        <h3 className="text-2xl">Receiver Details</h3>
                        {/* name */}
                        <fieldset className="fieldset">
                            <label className="label text-black">Receiver Name</label>
                            <input type="text" {...register('receiverName')} className="input w-full" placeholder="Receiver Name" />
                            {/* email */}
                            <label className="label text-black">Receiver Email</label>
                            <input type="email" {...register('receiverEmail')} className="input w-full" placeholder="Receiver Email" />
                            {/* region */}
                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend">Receiver Region</legend>
                                <select {...register('receiverRegion')} defaultValue="Pick a Region" className="select">
                                    <option >Pick a region</option>
                                    {
                                        regions.map((region, i) => <option key={i} value={region}>{region}</option>)
                                    }

                                </select>
                                {/* <span className="label">Optional</span> */}
                            </fieldset>
                            {/* Districts */}
                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend">Receiver District</legend>
                                <select {...register('receiverDistricts')} defaultValue="Pick a District" className="select">
                                    <option >Pick a district</option>
                                    {
                                        districtsByRegion(receiverRegion).map((d, i) => <option key={i} value={d}>{d}</option>)
                                    }
                                </select>
                                {/* <span className="label">Optional</span> */}
                            </fieldset>
                            {/* Address */}
                            <label className="label text-black">Address</label>
                            <input type="text" {...register('receiverAddress')} className="input w-full" placeholder="Receiver Address" />
                            {/* Number */}
                            <label className="label text-black">Number</label>
                            <input type="number" {...register('receiverNumber')} className="input w-full" placeholder="Receiver Phone Number" />
                            {/* District */}
                            {/* <label className="label text-black">District</label>
                            <input type="text" {...register('receiverDistrict')} className="input w-full" placeholder="Receiver District" /> */}
                            {/* Pickup Instruction */}
                            <label className="label text-black">Pickup Instruction</label>
                            <textarea type="text" {...register('receiverInstruction')} className="input w-full h-24" rows='9' cols='50' placeholder="Pickup Instruction" />
                        </fieldset>
                    </div>
                </div>
                <input type="submit" value="Send Parcel" className='btn btn-primary justify-end text-black' />
            </form>
        </div>
    );
};

export default SendParcel;
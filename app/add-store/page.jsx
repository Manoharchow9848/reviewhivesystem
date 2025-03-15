"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../db/firebaseConfig";
import { useRouter } from 'next/navigation';
const AddStrorePage = () => {
    const router = useRouter();
    const [storeOwnersEmails, setStoreOwnersEmails] = React.useState([]);
    const [file,setFile] = useState();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
      const [profilePic, setProfilePic] = useState( "https://img.freepik.com/premium-vector/round-gray-circle-with-simple-human-silhouette-light-gray-shadow-around-circle_213497-4963.jpg?w=740");
      const [preview, setPreview] = useState();
    useEffect(() => {
        getStoreOwnersEmails()
    },[])
    const getStoreOwnersEmails = async () => {
        try {
            const response = await fetch("/api/getStoreOwnersEmails", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store", // Ensures fresh data in Next.js
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setStoreOwnersEmails(data.emails);
            console.log("Store Owners Emails:", data.emails);
            
        } catch (error) {
            console.error("Failed to fetch store owners emails:", error);
            return null; // Handle errors gracefully
        }
    }
    const onImageSelect = (event) => {
        const file = event.target.files;
        if (file) {
          console.log(file[0]);
          const imageUrl = URL.createObjectURL(file[0]);
    
          setFile(file[0]);
          setProfilePic(imageUrl);
        }
      };

      const handleAddStore = async () => {
        if (!name || !email || !description || !address) {
          toast.error("All fields are required! ❌");
          return;
        }

        setLoading(true);
        let storeProfilePic = profilePic;
        try {
             if (file) {
                    const fileName = `profile_${Date.now()}.png`;
                    const imageRef = ref(storage, `wireframe/${fileName}`);
              
                    // Upload file to Firebase
                    await uploadBytes(imageRef, file);
                    storeProfilePic = await getDownloadURL(imageRef);
                        console.log(storeProfilePic)
                        
                    setProfilePic(storeProfilePic); // Update state after upload
                  }

                  const response = await fetch("/api/add-store", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, description, address, storeProfilePic }),
                    credentials: "include",
                  });
                  if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                  }
                  const data = await response.json();
                  console.log(data);
                  toast.success("Store added successfully!");
                  router.push("/dashboard");
                  setLoading(false)
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    
      }
    
  return (
    <div className="h-screen  w-full flex items-center justify-center bg-black">

      <Card className="bg-gray-900 text-white p-10 shadow-xl w-full max-w-4xl">
    <CardHeader className="flex flex-col items-center">
             
              <CardTitle className="text-gray-400 text-center text-2xl mt-4">
                Add Store
              </CardTitle>
            </CardHeader>
            <div  className="w-24 h-24 rounded-full overflow-hidden ml-94 border-4 border-blue-500">

            <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
          
          </div>
          <label className="ml-94 mt-0" htmlFor="imageSelect">select image</label>
          <input
              multiple={false}
              onChange={onImageSelect}
              type="file"
              id="imageSelect"
              className="hidden"
            />
            <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 block mb-1">Name</label>
              <Input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-800 text-white border-gray-700"
              />
              </div>
              <div>
              <label className="text-gray-400 block mb-1">Address</label>
              <Input
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                className="bg-gray-800 text-white border-gray-700"
              />
              </div>
              <div>
              <label className="block text-gray-700 mb-2">Select Store Owner Email:</label>
            <select
                className="border p-2 w-full rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            >
                <option className='bg-gray-900 ' value="">-- Select an Email --</option>
                {storeOwnersEmails.map((email, index) => (
                    <option className='bg-gray-900'  key={index} value={email}>
                        {email}
                    </option>
                ))}
            </select>

            {/* Display selected email */}
            {email && (
                <p className="mt-4 text-gray-900">Selected Email: {email}</p>
            )}
              </div>
              <div>
              <label className="text-gray-400 block mb-1">Description</label>
              <Textarea
                
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-800 text-white border-gray-700"
              />
              </div>
              <div className="flex justify-end mt-4">
            <Button onClick={handleAddStore} className='cursor-pointer'>
                {loading ? <LoaderCircle className="animate-spin size-8" /> : "Add Store"}
            </Button>
            </div>
            </div>
           

</Card>

    </div>
  )
}

export default AddStrorePage
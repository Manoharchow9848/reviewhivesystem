"use client";
import withAuth from "../hoc/withAuth";
import React, { useState, useContext, useEffect } from "react";
import { UserDetailContext } from "../../context/userDetailContext";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { CloudUpload, LoaderCircle } from "lucide-react";
import { Textarea } from "../../components/ui/textarea";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../db/firebaseConfig";
import { useRouter } from "next/navigation";
const ProfilePage = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
   const router = useRouter();
  useEffect(() => {
        if(localStorage.getItem("user") === null){
          router.push("/login");
        }
        if(userDetail){
          setName(userDetail.name);
          setEmail(userDetail.email);
          setAddress(userDetail.address);
          setProfilePic(userDetail.profilePic);
        }
  }, [userDetail]);

  const [name, setName] = useState(userDetail?.name || "");
  const [email, setEmail] = useState(userDetail?.email || "");
  const [address, setAddress] = useState(userDetail?.address || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file,setFile] = useState();
  const [profilePic, setProfilePic] = useState(userDetail?.profilePic || "https://img.freepik.com/premium-vector/round-gray-circle-with-simple-human-silhouette-light-gray-shadow-around-circle_213497-4963.jpg?w=740");
  const [preview, setPreview] = useState();
  

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/;
    return passwordRegex.test(password);
  };
  const onImageSelect = (event) => {
    const file = event.target.files;
    if (file) {
      console.log(file[0]);
      const imageUrl = URL.createObjectURL(file[0]);

      setFile(file[0]);
      setProfilePic(imageUrl);
    }
  };
  const handleUpdateProfile = async () => {
    if (!name || !email || !address) {
      toast.error("All fields are required! ❌");
      return;
    }
  
    let updatedProfilePic = profilePic;
  
    try {
      if (file) {
        const fileName = `profile_${Date.now()}.png`;
        const imageRef = ref(storage, `wireframe/${fileName}`);
  
        // Upload file to Firebase
        await uploadBytes(imageRef, file);
        updatedProfilePic = await getDownloadURL(imageRef);
  
        setProfilePic(updatedProfilePic); // Update state after upload
      }
  
      // Send API request with the new image URL
      setLoading(true);
      const response = await fetch("/api/updateProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, address, profilePic: updatedProfilePic }),
        credentials: "include",
      });
  
      const data = await response.json();
      if (response.ok) {
        toast.success("Profile updated successfully!");
        localStorage.setItem("user", JSON.stringify(data.user));
        setUserDetail(data.user);
      } else {
        toast.error("Failed to update profile ❌");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!password || !confirmPassword) {
      toast.error("Both fields are required! ❌");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match! ❌");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must be 8-16 characters long and contain at least one uppercase letter and one special character! ❌");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/changePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Password changed successfully!");
        setIsModalOpen(false);
      } else {
        toast.error(data.error || "Failed to change password");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen mt-2 w-full flex items-center justify-center bg-black">
      <Card className="bg-gray-900 text-white p-10 shadow-xl w-full max-w-4xl">
        <CardHeader className="flex flex-col items-center">
         
          <CardTitle className="text-blue-400 text-center text-2xl mt-4">
            Profile Settings
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col md:flex-row gap-6">
          {/* Left Side - Profile Update */}
          <div className="flex flex-col w-full md:w-1/2 space-y-6">
           {/* Profile Picture */}
           <div  className="w-24 h-24 rounded-full overflow-hidden ml-28 border-4 border-blue-500">

            <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
          
          </div>
          <label className="ml-28 mt-0" htmlFor="imageSelect">select image</label>
          
          <input
              multiple={false}
              onChange={onImageSelect}
              type="file"
              id="imageSelect"
              className="hidden"
            />
            <div>
              <label className="text-gray-400 block mb-1">Name</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-800 text-white border-gray-700"
              />
            </div>

            <div>
              <label className="text-gray-400 block mb-1">Email</label>
              <Input
                type="email"
                disabled
                value={email}
                className="bg-gray-800 text-white border-gray-700"
              />
            </div>

            <div>
              <label className="text-gray-400 block mb-1">Address</label>
              <Textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-gray-800 text-white border-gray-700"
                placeholder="Enter new Address"
              />
            </div>

            <Button
              onClick={handleUpdateProfile}
              className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg w-full cursor-pointer"
              disabled={loading}
            >
              {loading ? <LoaderCircle className="animate-spin mr-2" size={18} /> : "Update Profile"}
            </Button>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-[1px] bg-gray-600"></div>

          {/* Right Side - Change Password */}
          <div className="flex items-center justify-center md:w-1/2">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg w-full md:w-auto">
                  Change Password
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
                <DialogHeader>
                  <DialogTitle className="text-center text-lg text-red-400">
                    Change Password
                  </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col space-y-4">
                  <div>
                    <label className="text-gray-400 block mb-1">New Password</label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-800 text-white border-gray-700"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 block mb-1">Confirm Password</label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-gray-800 text-white border-gray-700"
                    />
                  </div>
                  <Button
                    onClick={handleChangePassword}
                    className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg w-full"
                    disabled={loading}
                  >
                    {loading ? <LoaderCircle className="animate-spin mr-2" size={18} /> : "Change Password"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default withAuth(ProfilePage);

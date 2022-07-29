import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";

const counties = [
  { value: "Baringo", label: "Baringo" },
  { value: "Bomet", label: "Bomet" },
  { value: "Bungoma", label: "Bungoma" },
  { value: "Busia", label: "Busia" },
  { value: "Elgeyo-Marakwet", label: "Elgeyo-Marakwet" },
  { value: "Embu", label: "Embu" },
  { value: "Garissa", label: "Garissa" },
  { value: "Homa Bay", label: "Homa Bay" },
  { value: "Isiolo", label: "Isiolo" },
  { value: "Kajiado", label: "Kajiado" },
  { value: "Kakamega", label: "Kakamega" },
  { value: "Kericho", label: "Kericho" },
  { value: "Kiambu", label: "Kiambu" },
  { value: "Kilifi", label: "Kilifi" },
  { value: "Kirinyaga", label: "Kirinyaga" },
  { value: "Kisii", label: "Kisii" },
  { value: "Kisumu", label: "Kisumu" },
  { value: "Kitui", label: "Kitui" },
  { value: "Kwale", label: "Kwale" },
  { value: "Laikipia", label: "Laikipia" },
  { value: "Lamu", label: "Lamu" },
  { value: "Machakos", label: "Machakos" },
  { value: "Makueni", label: "Makueni" },
  { value: "Mandera", label: "Mandera" },
  { value: "Marsabit", label: "Marsabit" },
  { value: "Meru", label: "Meru" },
  { value: "Migori", label: "Migori" },
  { value: "Mombasa", label: "Mombasa" },
  { value: "Muranga", label: "Muranga" },
  { value: "Nairobi", label: "Nairobi" },
  { value: "Nakuru", label: "Nakuru" },
  { value: "Nandi", label: "Nandi" },
  { value: "Narok", label: "Narok" },
  { value: "Nyamira", label: "Nyamira" },
  { value: "Nyandarua", label: "Nyandarua" },
  { value: "Nyeri", label: "Nyeri" },
  { value: "Samburu", label: "Samburu" },
  { value: "Siaya", label: "Siaya" },
  { value: "Taita-Taveta", label: "Taita-Taveta" },
  { value: "Tana River", label: "Tana River" },
  { value: "Tharaka-Nithi", label: "Tharaka-Nithi" },
];

const subCounties = [
  { value: "Baringo Central", label: "Baringo Central" },
  { value: "Baringo North", label: "Baringo North" },
  { value: "Baringo South", label: "Baringo South" },
  { value: "Eldama Ravine", label: "Eldama Ravine" },
  { value: "Mogotio", label: "Mogotio" },
  { value: "Tiaty", label: "Tiaty" },
  { value: "Bomet Central", label: "Bomet Central" },
  { value: "Bomet East", label: "Bomet East" },
  { value: "Bomet West", label: "Bomet West" },
  { value: "Chepalungu", label: "Chepalungu" },
  { value: "Konoin", label: "Konoin" },
  { value: "Sotik", label: "Sotik" },
  { value: "Bumula", label: "Bumula" },
  { value: "Butula", label: "Butula" },
  { value: "Kabuchai", label: "Kabuchai" },
  { value: "Kanduyi", label: "Kanduyi" },
  { value: "Kimilili", label: "Kimilili" },
  { value: "Webuye East", label: "Webuye East" },
  { value: "Webuye West", label: "Webuye West" },
  { value: "Budalangi", label: "Budalangi" },
];

export const useAddProviderPage = () => {
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const onExit = () => router.push("service-providers");

  const onSetIsUserLoggedIn = (value) => setIsUserLoggedIn(value);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      location: "",
      county: "",
      subCounty: "",
      category: "",
      categoryID: "",
      nationalID: "",
      isSP: true,
      profession: "",
      isActive: true,
      isAdmin: false,
      isClient: false,
      isOccupied: false,
      position: {},
      latitude: "",
      longitude: "",
    },

    onSubmit: (values) => {
      values.name = `${values.firstname} ${values.lastname}`;
      // createUser(values);
    },
  });

  return {
    counties,
    subCounties,
    isUserLoggedIn,
    downloadURL,
    image,
    progress,
    onExit,
    onSetIsUserLoggedIn,
    formik,
  };
};

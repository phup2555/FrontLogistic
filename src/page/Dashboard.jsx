import React, { useEffect, useState } from "react";
import StatCard from "../component/Card";
import { FaBoxArchive } from "react-icons/fa6";
import { fetchAllPdLength, fetchPdIn } from "../service/Service";

export default function Dashboard() {
  const [allPdLength, setAllPdLength] = useState(0);
  const [pdIn, setPdIn] = useState([]);
  const [loadingAll, setLoadingAll] = useState(true);
  const [loadingIn, setLoadingIn] = useState(true);
  const pdInLength = pdIn.length;
  const pdIn01 = pdIn.filter((item) => item.name === "01").length;
  const pdIn02 = pdIn.filter((item) => item.name === "02").length;
  const pdIn03 = pdIn.filter((item) => item.name === "03").length;
  const pdIn04 = pdIn.filter((item) => item.name === "04").length;

  const AllPdLength = async () => {
    try {
      setLoadingAll(true);
      const response = await fetchAllPdLength();
      setAllPdLength(response.data.length);
      setLoadingAll(false);
    } catch (error) {
      console.error("Error fetching all product length:", error);
    }
  };
  const PdInLength = async () => {
    try {
      setLoadingIn(true);
      const response = await fetchPdIn();
      setPdIn(response.data);
      setLoadingIn(false);
    } catch (error) {
      console.error("Error fetching product In length:", error);
    }
  };

  // const PdOutLength = async () => {
  //   try {
  //     setLoadingOut(true);
  //     const response = await fetchPdOut();
  //     setPdOutLength(response);
  //     setLoadingOut(false);
  //   } catch (error) {
  //     console.error("Error fetching product Out length:", error);
  //   }
  // };

  useEffect(() => {
    AllPdLength();
    PdInLength();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        ໜ້າຫຼັກ (Dashboard)
      </h1>
      <hr className="border-gray-400 mb-4" />

      <div
        className="grid grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-2 
                lg:grid-cols-2 
                xl:grid-cols-3 
                gap-2 
                sm:gap-4 
                md:gap-6 
                min-[820px]:gap-8
                lg:gap-10"
      >
        <StatCard
          title={"ທັງໝົດ"}
          count={allPdLength}
          icon={<FaBoxArchive />}
          loading={loadingAll}
        />
        <StatCard
          title={"ສິນຄ້າໃນສາງ"}
          count={pdInLength}
          icon={<FaBoxArchive />}
          loading={loadingIn}
        />
        <StatCard
          title={"ສິນຄ້າໃນຫ້ອງ 01"}
          count={pdIn01}
          icon={<FaBoxArchive />}
          loading={loadingIn}
        />
        <StatCard
          title={"ສິນຄ້າໃນຫ້ອງ 02"}
          count={pdIn02}
          icon={<FaBoxArchive />}
          loading={loadingIn}
        />
        <StatCard
          title={"ສິນຄ້າໃນຫ້ອງ 03"}
          count={pdIn03}
          icon={<FaBoxArchive />}
          loading={loadingIn}
        />
        <StatCard
          title={"ສິນຄ້າໃນຫ້ອງ 04"}
          count={pdIn04}
          icon={<FaBoxArchive />}
          loading={loadingIn}
        />
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import WhySoftdreams from "~/components/WhySoftdreams/WhySoftdreams";
import RecruitmentProcess from "~/components/RecruitmentProcess/RecruitmentProcess";
import Activities from "~/components/Activities/Activities";
import RecruitmentFAQ from "~/components/RecruitmentFAQ/RecruitmentFAQ";
import CareersBanner from "~/components/CareersBanner/CareersBanner";
import JobList from "~/components/JobList/JobList";
import { getCareerList } from "~/services/publicAPI";

export default function CareersPage() {
  const jobsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [careers, setCareers] = useState([]);


  const getData = async () => {
    try {
      const response = await getCareerList(currentPage, jobsPerPage);
      setTotalPages(response.totalPages);
      setCareers(response.careers);
      // Handle the data
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  }

  useEffect(() => {
    getData();
  }, [currentPage]);

  return (
    <>
      <div className="w-full">
        <CareersBanner />
        <JobList
          careers={careers}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <WhySoftdreams />
        <RecruitmentProcess />
        <Activities />
        <RecruitmentFAQ />
      </div>
    </>
  );
}


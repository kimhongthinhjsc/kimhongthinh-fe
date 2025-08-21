// pages/admin/Dashboard/DashboardIntroducePage.jsx
import React, { useEffect, useState } from "react";
import SomethingAboutAdmin from "./SomethingAboutAdmin";
import VideoSectionAdmin from "./VideoSectionAdmin";
import RoadSectionAdmin from "./RoadSectionAdmin";
import BehaviorRulesAdmin from "./BehaviorRulesAdmin";
import CoreValueAdmin from "./CoreValueAdmin";
import ClientsTestimonialsAdmin from "./ClientsTestimonialsAdmin";
import EditableImage from "~/components/EditableImage/EditableImage";
import DashboardIntroduceSkeleton from "./DashboardIntroduceSkeleton";
import { getIntroduce } from "~/services/publicAPI";
import { updateIntroduceData } from "~/services/adminAPI";

export default function DashboardIntroducePage() {
  const [introduceData, setIntroduceData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(true);

  useEffect(() => {
    const fetchIntroduce = async () => {
      const data = await getIntroduce();
      setIntroduceData(data);
      setLoading(false);
    };
    fetchIntroduce();
  }, []);

  const handleSave = async () => {
    if (!introduceData) return;
    try {
      setSaving(true);
      await updateIntroduceData(introduceData);
      alert("✅ Lưu thành công!");
    } catch (err) {
      console.error(err);
      alert("❌ Lưu thất bại");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <DashboardIntroduceSkeleton />;

  return (

      <div className="w-full space-y-12 p-6">
        {/* Banner */}
        <EditableImage
          src={introduceData.banner}
          onChange={(val) => setIntroduceData({ ...introduceData, banner: val })}
          label="Banner"
          className="w-full h-64"
        />

        {/* Something About */}
        <SomethingAboutAdmin
          data={introduceData.somethingAbout}
          onChange={(val) =>
            setIntroduceData({ ...introduceData, somethingAbout: val })
          }
        />

        {/* Video Section */}
        <VideoSectionAdmin
          data={introduceData.videoSection}
          onChange={(val) =>
            setIntroduceData({ ...introduceData, videoSection: val })
          }
        />

        {/* Road Section */}
        <RoadSectionAdmin
          data={introduceData.roadSection}
          onChange={(val) =>
            setIntroduceData({ ...introduceData, roadSection: val })
          }
        />

        {/* Behavior Rules */}
        <BehaviorRulesAdmin
          data={introduceData.behaviorRules}
          onChange={(val) =>
            setIntroduceData({ ...introduceData, behaviorRules: val })
          }
        />

        {/* Core Value */}
        <CoreValueAdmin
          data={introduceData.coreValue}
          onChange={(val) =>
            setIntroduceData({ ...introduceData, coreValue: val })
          }
        />

        {/* Clients Testimonials */}
        <ClientsTestimonialsAdmin
          data={introduceData.testimonials}
          onChange={(val) =>
            setIntroduceData({ ...introduceData, testimonials: val })
          }
        />

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition ${
              saving ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={saving}
          >
            {saving ? "Đang lưu..." : "Lưu toàn bộ"}
          </button>
        </div>
      </div>
  );
}

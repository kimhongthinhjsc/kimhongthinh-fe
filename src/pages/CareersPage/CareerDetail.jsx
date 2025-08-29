import React, { useEffect, useState } from "react";
import {
    Calendar,
    Users,
    DollarSign,
    Briefcase,
    MapPin,
    Clock,
    Building2,
    Mail,
    Phone,
    Target,
    Gift,
    FileText,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { getOneCareerById } from "~/services/publicAPI";
import logo from "~/assets/images/KHT.jpg";
import JobDetailSkeleton from "./SkeletonCareerDetail";

export default function JobDetail() {
    const [job, setJob] = React.useState(null);
    const [deadlineDate, setDeadlineDate] = React.useState(null);

    const [showContact, setShowContact] = useState(false);
    const { id } = useParams();

    // Fetch job details by ID
    const fetchJobDetail = async (id) => {
        const response = await getOneCareerById(id);
        console.log(response.career);
        setJob(response.career);
        setDeadlineDate(
            new Date(response.career.deadline).toLocaleDateString("vi-VN")
        );
    };

    useEffect(() => {
        fetchJobDetail(id);
    }, [id]);

    return (
        <>
            {!job ? <JobDetailSkeleton /> : (

                <section className="py-12 bg-gray-50">
                    <div className="w-full px-8">
                        <div className="grid md:grid-cols-12 gap-8">
                            {/* Cột trái (7/12) */}
                            <div className="md:col-span-8 space-y-8">
                                {/* Header */}
                                <div className="bg-white shadow-lg rounded-2xl p-8">
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                        <img
                                            src={logo}
                                            alt="Công ty KIM HỒNG THỊNH"
                                            className="w-28 h-28 rounded-xl object-cover border"
                                        />
                                        <div>
                                            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                                {job?.title}
                                            </h1>
                                            <p className="flex items-center gap-2 text-gray-600">
                                                <Building2 size={18} className="text-blue-500" />
                                                CÔNG TY CP DỊCH VỤ CÔNG NGHỆ KIM HỒNG THỊNH
                                            </p>
                                            <p className="flex items-center gap-2 text-gray-600">
                                                <MapPin size={18} className="text-red-500" />
                                                945/3 Ấp 3, Phường Sơn Đông, Vĩnh Long
                                            </p>
                                            <p className="flex items-center gap-2 text-gray-600">
                                                <Clock size={18} className="text-green-500" />
                                                Giờ làm việc: Thứ 2 - Thứ 6 (8h00 - 17h00) | Thứ 7 (8h00 -
                                                12h00)
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Thông tin chính */}
                                <div className="bg-white shadow-lg rounded-2xl p-8 space-y-8 border border-gray-100">
                                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                        <Briefcase className="text-blue-600" size={22} />
                                        Thông tin tuyển dụng
                                    </h2>

                                    <div className="grid grid-cols-1 gap-4 text-gray-700 text-base">
                                        {/* Mức lương */}
                                        <div className="flex items-start gap-3">
                                            <DollarSign size={18} className="text-yellow-500 shrink-0 mt-1" />
                                            <div className="flex-1">
                                                <span className="font-medium">Mức lương:</span>{" "}
                                                <span className="break-words">{job?.salary}</span>
                                            </div>
                                        </div>

                                        {/* Kinh nghiệm */}
                                        <div className="flex items-start gap-3">
                                            <Briefcase size={18} className="text-purple-500 shrink-0 mt-1" />
                                            <div className="flex-1">
                                                <span className="font-medium">Kinh nghiệm:</span>{" "}
                                                <span className="break-words">{job?.experience}</span>
                                            </div>
                                        </div>

                                        {/* Số lượng */}
                                        <div className="flex items-start gap-3">
                                            <Users size={18} className="text-green-500 shrink-0 mt-1" />
                                            <div className="flex-1">
                                                <span className="font-medium">Số lượng:</span>{" "}
                                                <span className="break-words">{job?.quantity} người</span>
                                            </div>
                                        </div>

                                        {/* Hạn nộp */}
                                        <div className="flex items-start gap-3">
                                            <Calendar size={18} className="text-blue-500 shrink-0 mt-1" />
                                            <div className="flex-1">
                                                <span className="font-medium">Hạn nộp:</span>{" "}
                                                <span className="break-words">{deadlineDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Mô tả */}
                                    <div className="bg-gray-50 rounded-xl p-5 space-y-2 border">
                                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                            <FileText className="text-indigo-500" size={18} />
                                            Mô tả công việc
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {job?.description}
                                        </p>
                                    </div>

                                    {/* Kỹ năng */}
                                    <div className="bg-gray-50 rounded-xl p-5 space-y-2 border">
                                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                            <Target className="text-pink-500" size={18} />
                                            Kỹ năng yêu cầu
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">{job?.skills}</p>
                                    </div>

                                    {/* Quyền lợi */}
                                    <div className="bg-gray-50 rounded-xl p-5 space-y-2 border">
                                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                            <Gift className="text-emerald-500" size={18} />
                                            Quyền lợi
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">{job?.benefits}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Cột phải (3/12) */}
                            <div className="md:col-span-4 space-y-6">
                                {/* Nút Ứng tuyển ngay */}
                                <div className="bg-white shadow-md rounded-2xl p-6">
                                    <button
                                        onClick={() => setShowContact(!showContact)}
                                        className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                                    >
                                        Ứng tuyển ngay
                                    </button>

                                    {showContact && (
                                        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2 text-gray-700">
                                            <p className="flex items-center gap-2">
                                                <Mail className="text-blue-500" size={18} />
                                                <span>Gửi CV qua email:</span>
                                                <span className="font-medium">{job?.contact?.email}</span>
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <Phone className="text-green-500" size={18} />
                                                <span>Hoặc liên hệ:</span>
                                                <span className="font-medium">{job?.contact?.phone}</span>
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Thông tin liên hệ */}
                                <div className="bg-white shadow-md rounded-2xl p-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                        Thông tin liên hệ
                                    </h2>
                                    <p className="text-gray-700">
                                        <span className="font-medium">{job?.contact.name}</span>
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-600 mt-2">
                                        <Mail size={16} className="text-indigo-500" />{" "}
                                        {job?.contact.email}
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-600 mt-2">
                                        <Phone size={16} className="text-green-500" />{" "}
                                        {job?.contact.phone}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>)}
        </>
    );
}

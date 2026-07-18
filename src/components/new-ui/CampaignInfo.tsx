"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import useCampaign from "@/hooks/useCampaign";
import { ICampaign } from "@/lib/interface";

dayjs.extend(duration);

const CampaignInfo: React.FC = () => {
  const [campaign, setCampaign] = useState<ICampaign | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { fetchActiveCampaign } = useCampaign();
  const router = useRouter();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const data = await fetchActiveCampaign();
        if (data?.activeCampaign) {
          setCampaign(data.activeCampaign);
        }
      } catch (error) {
        console.error("Error fetching campaign:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, []);

  useEffect(() => {
    if (campaign?.endDate) {
      updateCountdown(campaign.endDate);
      const interval = setInterval(() => updateCountdown(campaign.endDate), 1000);
      return () => clearInterval(interval);
    }
  }, [campaign]);

  const updateCountdown = (endDate: string) => {
    const now = dayjs();
    const end = dayjs(endDate);
    const diff = end.diff(now);

    if (diff > 0) {
      const dur = dayjs.duration(diff);
      const days = Math.floor(dur.asDays()).toString().padStart(2, "0");
      const hours = dur.hours().toString().padStart(2, "0");
      const minutes = dur.minutes().toString().padStart(2, "0");
      const seconds = dur.seconds().toString().padStart(2, "0");
      setTimeLeft(`${days}:${hours}:${minutes}:${seconds}`);
    } else {
      setTimeLeft("Expired");
    }
  };

  const parseTimeLeft = (time: string) => {
    if (time.includes("Expired")) {
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }
    const parts = time.split(":");
    return {
      days: parts[0] || "00",
      hours: parts[1] || "00",
      minutes: parts[2] || "00",
      seconds: parts[3] || "00",
    };
  };

  const handleNavigate = () => {
    if (campaign?.id) {
      router.push(`/campaign/${campaign.id}`);
    }
  };

  if (loading || !campaign) {
    return null;
  }

  const time = parseTimeLeft(timeLeft);
  const isExpired = timeLeft.includes("Expired");

  return (
    <section className='relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400'>
      {/* Animated overlay pattern */}
      <div className='absolute inset-0 opacity-10'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)`,
          }}
        />
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16'>
        <div className='grid lg:grid-cols-2 gap-8 items-center'>
          {/* Left: Campaign Info */}
          <div className='text-center lg:text-left space-y-5 sm:space-y-6'>
            <div className='inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30'>
              <span className='w-2 h-2 rounded-full bg-yellow-300 animate-pulse' />
              <span className='text-white text-xs sm:text-sm font-semibold uppercase tracking-wider'>
                {isExpired ? "Campaign Ended" : "Limited Time Offer"}
              </span>
            </div>

            <h2 className='text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tight'>
              {campaign.title}
            </h2>

            <p className='text-base sm:text-lg text-white/90 max-w-lg mx-auto lg:mx-0 leading-relaxed'>
              {campaign.description}
            </p>

            {campaign.discount > 0 && (
              <div className='inline-flex items-center gap-2 bg-white rounded-full px-5 py-2.5'>
                <span className='text-2xl font-black text-purple-600'>
                  {campaign.discount}{campaign.discountType === "%" ? "%" : ""}
                </span>
                <span className='text-sm font-medium text-neutral-700'>Discount</span>
              </div>
            )}

            <div className='pt-2'>
              <button
                onClick={handleNavigate}
                className='group inline-flex items-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300'>
                <span>Shop Campaign</span>
                <span className='group-hover:translate-x-1 transition-transform duration-300'>
                  →
                </span>
              </button>
            </div>
          </div>

          {/* Right: Countdown Timer */}
          <div className='flex justify-center lg:justify-end'>
            <div className='bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl'>
              <div className='flex items-center gap-2 mb-4 justify-center'>
                <svg className='w-5 h-5 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                <span className='text-white font-semibold text-sm sm:text-base uppercase tracking-wide'>
                  {isExpired ? "Sale Ended" : "Ends In"}
                </span>
              </div>

              {!isExpired ? (
                <div className='grid grid-cols-4 gap-3 sm:gap-4'>
                  {[
                    { value: time.days, label: "Days", color: "text-purple-600" },
                    { value: time.hours, label: "Hours", color: "text-pink-500" },
                    { value: time.minutes, label: "Mins", color: "text-orange-500" },
                    { value: time.seconds, label: "Secs", color: "text-yellow-500" },
                  ].map((item) => (
                    <div key={item.label} className='flex flex-col items-center'>
                      <div className='bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg min-w-[60px] sm:min-w-[80px]'>
                        <div className={`text-2xl sm:text-4xl font-black ${item.color} text-center`}>
                          {item.value}
                        </div>
                      </div>
                      <span className='text-white/80 text-xs sm:text-sm font-medium mt-2 uppercase'>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='text-center py-8'>
                  <p className='text-white text-2xl font-bold'>Campaign Ended</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative circles */}
      <div className='absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-32 -translate-y-32' />
      <div className='absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl transform -translate-x-48 translate-y-48' />
    </section>
  );
};

export default CampaignInfo;

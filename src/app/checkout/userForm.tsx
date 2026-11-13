"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BDDistrictList, BDDivisions } from "@/utils/content";
import { useLocations } from "@/hooks/useLocations";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { UserFormData } from "./page";
import { User } from "lucide-react";

// Select-option shape shared by API data and the legacy constants
interface DivisionOption {
  id: string;
  name: string;
  bn_name: string;
}
interface DistrictOption {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
}

interface IProps {
  formData: UserFormData;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleInputChange2: (name: string, value: any) => void;
}

const UserInformation: React.FC<IProps> = ({
  formData,
  handleInputChange,
  handleInputChange2,
}) => {
  const [divisionQuery, setDivisionQuery] = useState("");
  const [districtQuery, setDistrictQuery] = useState("");
  const [shippingAddress, setShippingAddress] = useState<{
    division: any;
    district: any;
    address: string;
  }>({
    division: {},
    district: {},
    address: "",
  });

  // Server-configured locations (divisions/districts + charges). Falls back
  // to the hardcoded constants when the API is unavailable.
  const { locations } = useLocations();

  const divisionOptions: DivisionOption[] = useMemo(() => {
    if (!locations) return BDDivisions as DivisionOption[];
    return locations.divisions.map((d) => ({
      id: d.divisionId,
      name: d.division,
      bn_name: d.districts[0]?.bnName || "",
    }));
  }, [locations]);

  const districtOptions: DistrictOption[] = useMemo(() => {
    if (!locations) return BDDistrictList as DistrictOption[];
    return locations.divisions.flatMap((d) =>
      d.districts.map((x) => ({
        id: x.sourceId,
        division_id: d.divisionId,
        name: x.name,
        bn_name: x.bnName,
      })),
    );
  }, [locations]);

  // Show charge per district option when available from the server config
  const chargeById = useMemo(() => {
    const map = new Map<string, number>();
    if (locations) {
      for (const d of locations.divisions) {
        for (const x of d.districts) map.set(x.sourceId, x.charge);
      }
    }
    return map;
  }, [locations]);

  const handleShippingDivChange = (id: string, name: string) => {
    if (name === "division") {
      const filteredDivision = divisionOptions.filter(
        (division) => division?.id === id,
      );
      if (filteredDivision.length > 0) {
        setShippingAddress({
          ...shippingAddress,
          division: filteredDivision[0],
          district: {}, // reset district when division changes
        });
        handleInputChange2(
          "division",
          //@ts-ignore
          `${filteredDivision[0]?.name}`,
        );
        // clear the stale district from the previous division
        handleInputChange2("district", "");
        handleInputChange2("districtId", "");
      }
    } else {
      const filteredDistrict = districtOptions.filter(
        (District) => District?.id === id,
      );
      if (filteredDistrict.length > 0) {
        setShippingAddress({
          ...shippingAddress,
          district: filteredDistrict[0],
        });
        handleInputChange2(
          "district",
          //@ts-ignore
          `${filteredDistrict[0]?.name}`,
        );
        handleInputChange2("districtId", filteredDistrict[0]?.id);
      }
    }
  };

  const inputClass =
    "rounded-xl border-neutral-200 bg-white text-sm placeholder:text-neutral-400 focus:ring-1 focus:ring-neutral-200 focus:border-neutral-300 transition-all duration-200 h-11";

  return (
    <Card className="rounded-2xl border-neutral-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center font-semibold text-neutral-900 text-base">
          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center mr-2.5">
            <User className="h-4 w-4 text-neutral-600" />
          </div>
          Shipping Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs font-medium text-neutral-600">
            Full Name
          </Label>
          <Input
            name="name"
            type="text"
            id="name"
            placeholder="Enter your full name"
            value={formData["name"]}
            onChange={handleInputChange}
            className={inputClass}
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <Label
            htmlFor="mobileNumber"
            className="text-xs font-medium text-neutral-600">
            Phone Number
          </Label>
          <Input
            name="mobileNumber"
            type="text"
            id="mobileNumber"
            placeholder="01XXXXXXXXX"
            value={formData["mobileNumber"]}
            onChange={handleInputChange}
            className={inputClass}
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label
            htmlFor="email"
            className="text-xs font-medium text-neutral-600">
            Email <span className="text-neutral-400">(optional)</span>
          </Label>
          <Input
            name="email"
            type="email"
            id="email"
            placeholder="you@example.com"
            value={formData["email"]}
            onChange={handleInputChange}
            className={inputClass}
          />
        </div>

        {/* District & Area */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label
              htmlFor="division"
              className="text-xs font-medium text-neutral-600">
              Division
            </Label>
            <Select
              onValueChange={(value: string) => {
                handleShippingDivChange(value, "division");
              }}>
              <SelectTrigger className={inputClass}>
                <SelectValue placeholder="Select division" />
              </SelectTrigger>
              <SelectContent>
                <Input
                  type="text"
                  className="mb-2 rounded-xl border-neutral-200 text-sm"
                  placeholder="Search..."
                  value={divisionQuery}
                  onChange={(e) => setDivisionQuery(e.target.value)}
                />
                {divisionOptions.filter(
                  (division) =>
                    division.name
                      .toLowerCase()
                      .includes(divisionQuery.toLowerCase()) ||
                    division.bn_name.includes(divisionQuery),
                ).map((division, index: number) => (
                  <SelectItem key={index} value={division?.id}>
                    {division?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="district"
              className="text-xs font-medium text-neutral-600">
              District
            </Label>
            {!!shippingAddress?.division ? (
              <Select
                onValueChange={(value: string) => {
                  handleShippingDivChange(value, "district");
                }}>
                <SelectTrigger className={inputClass}>
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  <Input
                    type="text"
                    className="mb-2 rounded-xl border-neutral-200 text-sm"
                    placeholder="Search..."
                    value={districtQuery}
                    onChange={(e) => setDistrictQuery(e.target.value)}
                  />
                  {districtOptions.filter(
                    (district) =>
                      !!shippingAddress.division &&
                      //@ts-ignore
                      shippingAddress?.division.id === district.division_id &&
                      (district.name
                        .toLowerCase()
                        .includes(districtQuery.toLowerCase()) ||
                        district.bn_name.includes(districtQuery)),
                  ).map((division, index: number) => (
                    <SelectItem key={index} value={division?.id}>
                      {division?.name}
                      {chargeById.get(division?.id) !== undefined &&
                        ` — ৳${chargeById.get(division?.id)}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                disabled
                placeholder="Select division first"
                className={inputClass}
              />
            )}
          </div>
        </div>

        {/* Address */}
        <div className="space-y-1.5">
          <Label
            htmlFor="address"
            className="text-xs font-medium text-neutral-600">
            Street Address
          </Label>
          <Input
            name="address"
            type="text"
            id="address"
            placeholder="House No, Road, Area"
            value={formData["address"]}
            onChange={handleInputChange}
            className={inputClass}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInformation;

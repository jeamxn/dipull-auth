"use client";

import { useRouter } from "next/navigation";
import React from "react";

import Insider from "@/provider/insider";
import { alert } from "@/utils/alert";
import instance from "@/utils/instance";

const Home = () => {
  const [loading, setLoading] = React.useState(false);

  const [gender, setGender] = React.useState<"male" | "female">("male");
  const [name, setName] = React.useState("");
  const [gradeClass, setGradeClass] = React.useState(11);
  const [number, setNumber] = React.useState(1);

  const router = useRouter();
  
  const newData = {
    gender,
    name,
    number: gradeClass * 100 + number,
  };

  const get = async () => {
    setLoading(true);
    try {
      const { data } = await instance.get("/api/myInfo");
      setGender(data.data.gender);
      setName(data.data.name);
      setGradeClass(Math.floor(data.data.number / 100));
      setNumber(data.data.number % 100);
    } catch (e: any) {
      alert.error(e.response.data.message);
    }
    setLoading(false);
  };

  const put = async () => {
    setLoading(true);
    const loading = alert.loading("정보 수정 중입니다.");
    try {
      const res = await instance.put("/api/myInfo", newData);
      await get();
      alert.update(loading, res.data.message, "success");
      await instance.get("/auth/logout");
      router.refresh();
    }
    catch(e: any){
      alert.update(loading, e.response.data.message, "error");
    }
    setLoading(false);
  };

  React.useEffect(() => {
    get();
  }, []);

  return (
    <Insider>
      <article className="flex flex-col gap-3">
        <section className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold">내 정보 수정</h1>
          <h1 className="text-base text-[#e11d48]">허위로 정보를 입력하였을 경우, 불이익은 책임지지 않습니다.</h1>
          <h1 className="text-base text-primary">수정된 정보는 로그아웃 후 다시 로그인 시 반영됩니다.</h1>
        </section>
      </article>
      <section className="flex flex-col gap-3">
        <h1 className="text-xl font-semibold w-max whitespace-nowrap">이름</h1>
        <section className={[
          "bg-white p-5 border border-text/10 rounded",
          loading ? "loading_background" : "",
        ].join(" ")}>
          <input 
            type="text" 
            placeholder="이름을 입력해주세요." 
            className="w-full h-10 border border-text/10 rounded px-3 bg-transparent"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </section>
      </section>
      <article className="flex flex-col gap-3">
        <section className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold">성별</h1>
        </section>
        <article className={[
          "flex flex-row gap-2 bg-white rounded border border-text/10 p-5",
          loading ? "loading_background" : "",
        ].join(" ")}>
          <button 
            className={[
              "text-base rounded h-10 border border-text/10 w-full px-8 transition-colors",
              gender === "male" ? "bg-text/10" : "",
            ].join(" ")}
            disabled={loading}
            onClick={() => setGender("male")}
          >
            남자
          </button>
          <button 
            className={[
              "text-base rounded h-10 border border-text/10 w-full px-8 transition-colors",
              gender === "female" ? "bg-text/10" : "",
            ].join(" ")}
            disabled={loading}
            onClick={() => setGender("female")}
          >
            여자
          </button>
        </article>
      </article>
      <article className="flex flex-col gap-3">
        <section className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold">학년 / 반 / 번호</h1>
        </section>
        <article className={[
          "flex flex-row gap-2 bg-white rounded border border-text/10 p-5",
          loading ? "loading_background" : "",
        ].join(" ")}>
          <select 
            className="text-base rounded h-10 border border-text/10 w-full px-4 transition-colors bg-transparent"
            value={gradeClass}
            onChange={(e) => {
              setGradeClass(parseInt(e.target.value));
            }}
          >
            <optgroup label="1학년">
              <option value="11">1학년 1반</option>
              <option value="12">1학년 2반</option>
              <option value="13">1학년 3반</option>
              <option value="14">1학년 4반</option>
              <option value="15">1학년 5반</option>
              <option value="16">1학년 6반</option>
            </optgroup>
            <optgroup label="2학년">
              <option value="21">2학년 1반</option>
              <option value="22">2학년 2반</option>
              <option value="23">2학년 3반</option>
              <option value="24">2학년 4반</option>
              <option value="25">2학년 5반</option>
              <option value="26">2학년 6반</option>
            </optgroup>
            <optgroup label="3학년">
              <option value="31">3학년 1반</option>
              <option value="32">3학년 2반</option>
              <option value="33">3학년 3반</option>
              <option value="34">3학년 4반</option>
              <option value="35">3학년 5반</option>
              <option value="36">3학년 6반</option>
            </optgroup>
          </select>
          <div className="w-full h-10 border border-text/10 rounded px-3 bg-transparent flex flex-row items-center justify-center">
            <input 
              type="text" 
              placeholder="번호를 입력해주세요." 
              className="w-full h-full bg-transparent"
              value={number || ""}
              onChange={(e) => setNumber(parseInt(e.target.value))}
              disabled={loading}
            />
            <p>번</p>
          </div>
        </article>
      </article>
      <button 
        className="bg-primary text-white w-full text-base font-semibold rounded h-10"
        onClick={put}
      >
        내 정보 수정하기
      </button>
    </Insider>
  );
};

export default Home;
"use client";

import AppHeader from "@/app/_components/AppHeader";
import Constants from "@/data/Constants";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import SelectionDetail from "../_components/SelectionDetail";
import CodeEditor from "../_components/CodeEditor";

export interface RECORD {
  id: number;
  description: string;
  code: any;
  imageUrl: string;
  model: string;
  createdBy: string;
  uid: string;
}

function ViewCode() {
  const { uid } = useParams();
  const [loading, setLoading] = useState(false);
  const [codeResp, setCodeResp] = useState("");
  const [record, setRecord] = useState<RECORD | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (uid) {
      GetRecordInfo();
    }
  }, [uid]);

  const GetRecordInfo = async (regen = false) => {
    try {
      setIsReady(false);
      setCodeResp("");
      setLoading(true);

      const { data } = await axios.get(`/api/wireframe-to-code?uid=${uid}`);
      setRecord(data);

      if (data?.error) {
        console.error("No Record Found");
        return;
      }

      if (!data?.code || regen) {
        await GenerateCode(data);
      } else {
        setCodeResp(data.code.resp);
        setIsReady(true);
      }
    } catch (err) {
      console.error("Error fetching record:", err);
      alert("Failed to fetch record.");
    } finally {
      setLoading(false);
    }
  };

  const GenerateCode = async (record: RECORD) => {
    try {
      setLoading(true);
      const res = await fetch("/api/ai-model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: record.description + ": " + Constants.PROMPT,
          model: record.model,
          imageUrl: record.imageUrl,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.error || "AI model failed.");
      }

      if (!res.body) throw new Error("No stream returned from model.");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const cleanText = decoder
          .decode(value)
          .replace(/```(jsx|javascript)?/g, "")
          .replace(/```/g, "");

        setCodeResp((prev) => prev + cleanText);
      }

      setIsReady(true);
      await UpdateCodeToDb();
    } catch (err: any) {
      console.error("Error generating code:", err.message || err);
      alert("AI model failed to respond. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const UpdateCodeToDb = async () => {
    try {
      if (!record?.uid || !codeResp) return;

      await axios.put("/api/wireframe-to-code", {
        uid: record.uid,
        codeResp: { resp: codeResp },
      });
    } catch (err) {
      console.error("Error updating DB:", err);
    }
  };

  return (
    <div>
      <AppHeader hideSidebar={true} />

      <div className="grid grid-cols-1 md:grid-cols-5 p-5 gap-10">
        <div>
          <SelectionDetail
            record={record}
            regenrateCode={() => GetRecordInfo(true)}
            isReady={isReady}
          />
        </div>

        <div className="col-span-4">
          {loading ? (
            <div className="flex items-center justify-center bg-slate-100 h-[80vh] rounded-xl p-20">
              <h2 className="font-bold text-2xl text-center flex items-center gap-2">
                <Loader2 className="animate-spin" />
                Analyzing the Wireframe...
              </h2>
            </div>
          ) : (
            <CodeEditor codeResp={codeResp} isReady={isReady} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewCode;

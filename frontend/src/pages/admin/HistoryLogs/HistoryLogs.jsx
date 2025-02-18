import React, { useState } from "react";
import { useAllLogsAQuery } from "../../../store/Features/documents.feature";
import Loader from "../../../components/Loader/Loader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

function HistoryLogs() {
  const { data: historyData, isLoading } = useAllLogsAQuery();
  const [selectedLog, setSelectedLog] = useState(null);

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {historyData?.data?.map(log => (
        <Card key={log._id} className="p-4 border space-y-6 rounded-lg shadow-md bg-themeColor">
          <div>
          <p className="text-lg font-bold text-gray-100">{log.userId.username}</p>
          <p className="text-sm text-gray-300">{log.userId.email}</p>
          <p className="text-xs text-gray-300">{new Date(log.timestamp).toLocaleDateString()}</p>
          </div>
          <Button onClick={() => setSelectedLog(log)} className="w-full bg-themeColor text-white border border-white hover:bg-gray-800">View Details</Button>
        </Card>
      ))}

      {selectedLog && (
        <Dialog open={Boolean(selectedLog)} onOpenChange={() => setSelectedLog(null)}>
          <DialogContent className="max-w-3xl h-[80vh] overflow-y-auto p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Translation Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p><strong>Document:</strong> {selectedLog.documentId.originalFileName}</p>
              <p><strong>Languages:</strong> {selectedLog.sourceLanguage} → {selectedLog.targetLanguage}</p>
              <p style={{whiteSpace: "pre-line"}}><strong>Original Text:</strong> {selectedLog.documentId.originalText}</p>
              <p style={{whiteSpace:"pre-line"}}><strong>Translated Text:</strong> {selectedLog.documentId.translatedText}</p>
              <p><strong>User:</strong> {selectedLog.userId.username} ({selectedLog.userId.email})</p>
              <p><strong>Timestamp:</strong> {new Date(selectedLog.timestamp).toLocaleString()}</p>
            </div>
            <Button variant="outline" className="mt-4 bg-black hover:text-black hover:border-4 text-white" onClick={() => setSelectedLog(null)}>Close</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default HistoryLogs;

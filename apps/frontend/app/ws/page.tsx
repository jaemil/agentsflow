'use client';
import React, { useState, useCallback, useEffect, useRef } from 'react';

export default function Page() {
  const ws = useRef<any>(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8999/ws');

    ws.current.onopen = () => {
      console.log('ws opened');
    };

    ws.current.onclose = () => {
      console.log('ws closed');
    };

    ws.current.onmessage = (event: { data: string }) => {
      console.log('Agent: ' + JSON.parse(event.data).message);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const startAgent = () => {
    ws.current.send(
      JSON.stringify({
        action: 'start_agent',
        agent_name: 'assistant',
        message: 'What are you and what is your purpose?',
      })
    );
  };

  const runAgent = () => {
    ws.current.send(
      JSON.stringify({
        action: 'run_agent',
        agent_name: 'assistant',
        message: 'Build a simple calculator with ui',
      })
    );
  };

  return (
    <div className="space-x-4">
      <button
        onClick={() => {
          startAgent();
        }}
      >
        Start
      </button>
      <button
        onClick={() => {
          runAgent();
        }}
      >
        Run
      </button>
    </div>
  );
}

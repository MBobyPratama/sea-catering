import React, { PropsWithChildren } from 'react';

export default function Authenticated({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-gray-100">
            <main>{children}</main>
        </div>
    );
}

"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { generateSignInQRCode } from "../auth.service";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { io, Socket } from "socket.io-client";
import { env } from "@/lib/env";
import { IUsers } from "@/features/users/types/users.type";

let socket: Socket;

const SignInContainer = () => {
  const [showQR, setShowQR] = useState(false);
  const [user, setUser] = useState<IUsers>();
  const { mutateAsync, isPending, data } = useMutation({
    mutationKey: ["generateQRCode"],
    mutationFn: (client: string) => generateSignInQRCode(client),
    onError: (error) => {
      toast.error(error.message);
      setShowQR(false);
    },
  });

  const handleGenerateQRCode = useCallback(async () => {
    setShowQR(true);
    setUser(undefined);
    const client = "APP-PAP";
    await mutateAsync(client);
  }, [mutateAsync]);

  useEffect(() => {
    socket = io(env.NEXT_PUBLIC_API_URL);

    socket.on("scan-code", (data) => {
      console.log("Detected login-success event:", data);
      const user = data.user as IUsers;
      toast.success(`User with name: ${user.name} has logged in successfully`);
      setUser(user);
      setShowQR(false);
    });
    socket.on("connect_error", (err) => {
      console.error("Connection Error:", err);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="container mx-auto pt-20 flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold">Login Client Side PAP</h1>
      <Button
        onClick={() => {
          if (user) {
            setUser(undefined);
          } else {
            handleGenerateQRCode();
          }
        }}
        className="mt-5"
        size={"lg"}
      >
        {user ? "Logout" : "Sign In"}
      </Button>

      {user && (
        <div className="mt-5">
          <h1 className="text-3xl font-bold">Welcome !!!</h1>
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
          <p>Id: {user?.id}</p>
        </div>
      )}

      {showQR && (
        <div className="mt-5 p-3 border-[2px] flex items-center justify-center rounded-xl h-[224px] w-[224px]  border-neutral-800">
          {isPending && <Loader2Icon className="animate-spin h-20 w-20" />}
          {!isPending && data && (
            <QRCodeSVG value={data} height={200} width={200} />
          )}
        </div>
      )}
    </div>
  );
};

export default SignInContainer;

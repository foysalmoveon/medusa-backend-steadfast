import React, { useState } from "react";
import type { SettingConfig, SettingProps } from "@medusajs/admin";
import {Button, FocusModal} from "@medusajs/ui";
import {FocusModalDemo} from "../../component/steadFastModal";

type Provider = {
  label: string;
  name: string;
};

const fakeData: Provider[] = [
  {
    label: "steadfast",
    name: "steadFast",
  },
  {
    label: "pathao",
    name: "pathao",
  },
];

const CustomSettingPage = ({ notify }: SettingProps) => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const handleFocusModal = (providerName: string) => {
    setSelectedProvider(providerName);
  };

  const handleCloseModal = () => {
    setSelectedProvider(null);
  };



  return (
      <div className="bg-white p-8 border border-gray-200 rounded-lg">

        <FocusModal>

          {fakeData.map((provider) => (
              <FocusModal.Trigger asChild>
                <Button key={provider.name} onClick={() => handleFocusModal(provider.name)}>
                  {provider.label}
                </Button>
              </FocusModal.Trigger>
          ))}
          <FocusModal.Content>
            <FocusModal.Header>
              <Button>Save</Button>
            </FocusModal.Header>
            <FocusModal.Body className="flex flex-col items-center py-16">
              {selectedProvider === "steadFast" && (
                  <FocusModalDemo onClose={handleCloseModal} />
              )}
            </FocusModal.Body>
          </FocusModal.Content>
        </FocusModal>

      </div>
  );
};

export const config: SettingConfig = {
  card: {
    label: "Fulfilment/Courier",
    description: "Manage your Fulfilment/Courier settings",
  },
}

export default CustomSettingPage

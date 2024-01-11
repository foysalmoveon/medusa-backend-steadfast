import { FocusModal, Heading, Input, Label, Text } from "@medusajs/ui";

interface FocusModalDemoProps {
    onClose: () => void;
}

export function FocusModalDemo({ onClose }: FocusModalDemoProps) {
    return (
        // @ts-ignore
        <FocusModal.Body className="flex flex-col items-center py-16">
            <div className="flex w-full max-w-lg flex-col gap-y-8">
                <div className="flex flex-col gap-y-1">
                    <Heading>Create API key</Heading>
                    <Text className="text-ui-fg-subtle">
                        Create and manage API keys. You can create multiple keys to  organize your applications.
                    </Text>
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label htmlFor="key_name" className="text-ui-fg-subtle">Api-Key</Label>
                    <Input id="key_name" placeholder="Api-Key" />
                </div>

                <div className="flex flex-col gap-y-2">
                    <Label htmlFor="key_name" className="text-ui-fg-subtle">Secret-Key</Label>
                    <Input id="key_name" placeholder="Secret-Key" />
                </div>
            </div>
        </FocusModal.Body>
    );
}

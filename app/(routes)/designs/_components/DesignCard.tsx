import { RECORD } from '@/app/view-code/[uid]/page';
import { Button } from '@/components/ui/button';
import Constants from '@/data/Constants';
import { Code } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function DesignCard({ item }: { item: RECORD }) {
  const modelObj = item && Constants.AiModelList.find((x) => x.name === item?.model);

  return (
    <div className="p-5 border rounded-lg">
      <Image
        src={item?.imageUrl}
        alt="image"
        width={300}
        height={200}
        className="w-full h-[200px] object-cover bg-white rounded-lg"
      />

      <div className="mt-2">
        <h2 className="line-clamp-3 text-gray-400 text-sm">{item?.description}</h2>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-full">
            {modelObj?.icon && (
              <Image
                src={modelObj.icon}
                alt={modelObj.modelName ?? 'model'}
                width={30}
                height={30}
              />
            )}
            <h2 className="text-sm font-medium">
              {modelObj?.name ?? item?.model ?? 'Unknown model'}
            </h2>
          </div>

          <Link href={'/view-code/' + item?.uid}>
            <Button>
              <Code className="mr-1 h-4 w-4" />
              View Code
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DesignCard;

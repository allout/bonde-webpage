import React from 'react';
import { Wrap } from './styles';
import { isMobile } from 'react-device-detect';

const WhatsAppShareButton = ({ whatsappText }: { whatsappText: string }) => {
  const baseUrl = isMobile ? 'whatsapp://' : 'https://web.whatsapp.com/';

  return (
    <Wrap>
      <a
        href={`${baseUrl}send?text=${encodeURIComponent(whatsappText)}`}
        style={{ backgroundColor: '#4CEC68', color: '#fff' }}
        target="_blank"
        rel="noopener noreferrer"
      >
        Compartilhar no WhatsApp
      </a>
    </Wrap>
  );
};

export default WhatsAppShareButton;

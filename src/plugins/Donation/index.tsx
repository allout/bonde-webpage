import React, { useState } from 'react';
import styled from 'styled-components';
import DonationForm from './DonationFormCreate';
import ReattemptDonation from './ReattemptDonation';

type DonationStylesProps = {
  mainColor: string;
};

const DonationStyles = styled.div<DonationStylesProps>`
  text-align: center;
  border-radius: '3px 3px 0 0';
  background: '#fff';

  h2 {
    padding: 1rem;
    color: #fff;
    font-weight: 400;
    margin: 0;
    background-color: ${props => props.mainColor};
  }

  &:after,
  &:before {
    content: ' ';
    display: table;
  }
`;

type Props = {
  extraProps: {
    mainColor: string;
    title: string;
    paymentType: string;
    recurringPeriod: number;
    buttonText: string;
  };
  // ApolloClient instance
  client: any;
  asyncDonationCreate?: any;
  donationCustomerData?: any;
  mobilization: any;
  widget: {
    id: number;
    settings: {
      main_color?: string;
      title_text?: string;
      call_to_action?: string;
      button_text?: string;
      payment_type?: string;
      goal_date_limit?: string;
      recurring_period?: number;
      donation_value1?: number;
      donation_value2?: number;
      donation_value3?: number;
      donation_value4?: number;
      donation_value5?: number;
    };
  };
};

const DonationPlugin: React.FC<Props> = ({
  asyncDonationCreate,
  client,
  donationCustomerData,
  extraProps,
  widget,
  mobilization,
}) => {
  const { headerFont } = mobilization;
  const {
    settings: {
      main_color: mainColor,
      title_text: titleText,
      call_to_action: callToAction,
      button_text: buttonText,
      payment_type: paymentType,
      recurring_period: recurringPeriod,
    },
  } = widget;
  // States
  const [donation, setDonation] = useState();
  const [selectedPaymentType, setSelectedPaymentType] = useState(
    !!paymentType && paymentType !== 'users_choice'
      ? paymentType
      : extraProps.paymentType
  );
  const [selectedValue, setSelectedValue] = useState(1);
  const [loading, setLoading] = useState(false);

  const recurringLabel = ({ 30: 'mês', 180: 'semestre', 365: 'ano' } as Record<
    number,
    any
  >)[recurringPeriod || extraProps.recurringPeriod];

  const handleClickDonate = () => {
    if (asyncDonationCreate) {
      setLoading(true);
      asyncDonationCreate({
        mobilization,
        widget,
        formValues: {
          value: selectedValue,
          paymentType: selectedPaymentType,
        },
        customerData: donationCustomerData,
      }).then((res: any) => {
        setDonation(res.donation);
        setLoading(false);
      });
      // .catch((err: any) => {
      //   console.log('err', { err });
      //   setLoading(false);
      // });
    }
  };

  const renderStrategy = () => {
    const defaultProps = {
      headerFont,
      handleClickDonate,
      mainColor: mainColor || extraProps.mainColor,
    };

    // Workflow Renders
    if (donationCustomerData) return <ReattemptDonation {...defaultProps} />;

    if (donation) return <h2>ThankYouText</h2>;

    return (
      <DonationForm
        {...defaultProps}
        client={client}
        widget={widget}
        loading={loading}
        recurringLabel={recurringLabel}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        selectedPaymentType={selectedPaymentType}
        setSelectedPaymentType={setSelectedPaymentType}
        titleText={callToAction || titleText || extraProps.title}
        buttonText={buttonText || extraProps.buttonText}
      />
    );
  };

  return (
    <DonationStyles mainColor={mainColor || extraProps.mainColor}>
      {renderStrategy()}
    </DonationStyles>
  );
};

DonationPlugin.defaultProps = {
  widget: { id: 0, settings: {} },
  extraProps: {
    mainColor: '#54d0f6',
    title: 'Clique para configurar seu bloco de doação',
    paymentType: 'recurring',
    recurringPeriod: 30,
    buttonText: 'Doar agora',
  },
};

export default DonationPlugin;

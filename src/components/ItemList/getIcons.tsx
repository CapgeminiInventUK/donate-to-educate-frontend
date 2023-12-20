export type ItemsIconType = 'tick' | 'heart' | 'plus';

export const getItemsIcon = (type: ItemsIconType): JSX.Element => {
  switch (type) {
    case 'tick':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
        >
          <path
            d="M14 1.5L5.0506 10.5L2 7.43215"
            stroke="#11356F"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'heart':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="none"
        >
          <path
            d="M8.00003 12.4499L2.48003 7.4499C-0.519972 4.4499 3.89003 -1.3101 8.00003 3.3499C12.11 -1.3101 16.5 4.4699 13.52 7.4499L8.00003 12.4499Z"
            stroke="#11356F"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'plus':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z"
            stroke="#11356F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 5V11"
            stroke="#11356F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 8H11"
            stroke="#11356F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      throw new Error(`Unexpected type ${String(type)}`);
  }
};

export type SectionsIconType =
  | 'Clothing and uniform'
  | 'Sports'
  | 'Art and music'
  | 'Study'
  | 'Toiletries'
  | 'Computing and technology';

export const getSectionsIcon = (type: SectionsIconType): JSX.Element => {
  switch (type) {
    case 'Clothing and uniform':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="25"
          viewBox="0 0 27 25"
          fill="none"
        >
          <path
            d="M19.7497 2.67871L25.1069 8.03585L21.5354 11.6073L19.7497 9.82157V20.5359C19.7497 21.0095 19.5616 21.4637 19.2267 21.7985C18.8918 22.1334 18.4376 22.3216 17.964 22.3216H9.03544C8.56183 22.3216 8.10763 22.1334 7.77274 21.7985C7.43786 21.4637 7.24972 21.0095 7.24972 20.5359V9.82157L5.46401 11.6073L1.89258 8.03585L7.24972 2.67871H19.7497Z"
            stroke="#11356F"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'Sports':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
        >
          <path
            d="M13.4997 25.1074C19.9102 25.1074 25.1069 19.9107 25.1069 13.5002C25.1069 7.08976 19.9102 1.89307 13.4997 1.89307C7.08927 1.89307 1.89258 7.08976 1.89258 13.5002C1.89258 19.9107 7.08927 25.1074 13.4997 25.1074Z"
            stroke="#11356F"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.5 1.89307V25.1074"
            stroke="#11356F"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.75 21.125C6.05846 20.3284 7.13997 19.2086 7.89053 17.8733C8.64109 16.5379 9.03546 15.0319 9.03571 13.5C9.03546 11.9681 8.64109 10.4621 7.89053 9.12675C7.13997 7.79137 6.05846 6.67156 4.75 5.875"
            stroke="#11356F"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22.2501 5.875C20.9421 6.67186 19.861 7.7918 19.1109 9.12716C18.3608 10.4625 17.9668 11.9684 17.9668 13.5C17.9668 15.0316 18.3608 16.5375 19.1109 17.8728C19.861 19.2082 20.9421 20.3281 22.2501 21.125"
            stroke="#11356F"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'Art and music':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
        >
          <path
            d="M11.9462 22.5356C9.21401 25.2856 4.57115 26.1963 1.89258 23.4463C5.46401 19.7498 1.89258 17.9641 4.57115 15.2856C5.04148 14.7616 5.61371 14.3391 6.25286 14.0438C6.89201 13.7486 7.58466 13.5867 8.28848 13.5682C8.9923 13.5497 9.6925 13.6749 10.3463 13.9361C11.0001 14.1974 11.5938 14.5892 12.091 15.0876C12.5882 15.5861 12.9786 16.1807 13.2383 16.8351C13.4979 17.4896 13.6214 18.1901 13.6011 18.8939C13.5809 19.5976 13.4174 20.2899 13.1205 20.9283C12.8237 21.5667 12.3998 22.1379 11.8747 22.607L11.9462 22.5356Z"
            stroke="#11356F"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24.0714 2.92855C23.7251 2.58444 23.3119 2.31499 22.8573 2.13685C22.4028 1.95871 21.9165 1.87566 21.4286 1.89284C20.941 1.90609 20.4613 2.01909 20.019 2.22486C19.5767 2.43063 19.1813 2.72481 18.8571 3.08926L9.25 13.8035C10.2802 14.0076 11.2221 14.5253 11.9464 15.2857C12.5979 15.9345 13.0714 16.7401 13.3214 17.625L23.9107 8.14283C24.273 7.82069 24.5659 7.42815 24.7716 6.98913C24.9773 6.55012 25.0915 6.07382 25.1071 5.58926C25.1268 5.09838 25.045 4.60872 24.8667 4.1509C24.6885 3.69309 24.4178 3.27696 24.0714 2.92855V2.92855Z"
            stroke="#11356F"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'Study':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
        >
          <path
            d="M15.2854 25.1074H3.67829C3.20469 25.1074 2.75049 24.9192 2.4156 24.5843C2.08072 24.2494 1.89258 23.7952 1.89258 23.3216V3.67878C1.89258 3.20518 2.08072 2.75098 2.4156 2.41609C2.75049 2.0812 3.20469 1.89307 3.67829 1.89307H17.0711"
            stroke="#11356F"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.75 7.25021L22.4286 1.89307L25.1071 7.25021V22.4288C25.1071 23.1392 24.8249 23.8205 24.3226 24.3228C23.8203 24.8251 23.139 25.1074 22.4286 25.1074C21.7182 25.1074 21.0369 24.8251 20.5345 24.3228C20.0322 23.8205 19.75 23.1392 19.75 22.4288V7.25021Z"
            stroke="#11356F"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.75 17.9644H25.1071"
            stroke="#11356F"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.25 1.89307V25.1074"
            stroke="#11356F"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.7139 8.14307H15.2853"
            stroke="#11356F"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'Toiletries':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
        >
          <path
            d="M1.89258 16.1787H25.1069V19.7501C25.1069 21.1709 24.5425 22.5336 23.5378 23.5382C22.5331 24.5429 21.1705 25.1073 19.7497 25.1073H7.24972C5.82892 25.1073 4.46631 24.5429 3.46165 23.5382C2.45699 22.5336 1.89258 21.1709 1.89258 19.7501V16.1787Z"
            stroke="#11356F"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.3929 5.46401C14.3929 4.5168 14.0166 3.6084 13.3468 2.93863C12.677 2.26885 11.7686 1.89258 10.8214 1.89258C9.87423 1.89258 8.96582 2.26885 8.29605 2.93863C7.62627 3.6084 7.25 4.5168 7.25 5.46401V16.1783"
            stroke="#11356F"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.3926 9.03516V10.8209"
            stroke="#11356F"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'Computing and technology':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="21"
          viewBox="0 0 25 21"
          fill="none"
        >
          <path
            d="M4.46461 12.2852L1.28604 16.8387C1.14266 17.118 1.07542 17.4301 1.0911 17.7436C1.10677 18.0571 1.20481 18.3609 1.37532 18.6244C1.53616 18.8818 1.75993 19.0939 2.02551 19.2407C2.29109 19.3876 2.58971 19.4643 2.89318 19.4637H22.1075C22.4109 19.4643 22.7096 19.3876 22.9751 19.2407C23.2407 19.0939 23.4645 18.8818 23.6253 18.6244C23.7821 18.353 23.8646 18.045 23.8646 17.7316C23.8646 17.4181 23.7821 17.1102 23.6253 16.8387L20.536 12.2852"
            stroke="#11356F"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.25056 1.57129C5.77696 1.57129 5.32275 1.75943 4.98787 2.09431C4.65298 2.4292 4.46484 2.8834 4.46484 3.357V12.2856H20.5363V3.357C20.5363 2.8834 20.3481 2.4292 20.0132 2.09431C19.6784 1.75943 19.2242 1.57129 18.7506 1.57129H6.25056Z"
            stroke="#11356F"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      throw new Error(`Unexpected type ${String(type)}`);
  }
};

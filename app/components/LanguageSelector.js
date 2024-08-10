// app/components/LanguageSelector.js
import React from "react";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "ms", name: "Malay" },
  { code: "id", name: "Indonesian" },
  { code: "th", name: "Thai" },
  { code: "vi", name: "Vietnamese" },
  { code: "tr", name: "Turkish" },
  { code: "nl", name: "Dutch" },
  { code: "sv", name: "Swedish" },
  { code: "pl", name: "Polish" },
  { code: "uk", name: "Ukrainian" },
  { code: "ro", name: "Romanian" },
  { code: "el", name: "Greek" },
  { code: "cs", name: "Czech" },
  { code: "hu", name: "Hungarian" },
  { code: "he", name: "Hebrew" },
  { code: "fa", name: "Persian" },
  { code: "ta", name: "Tamil" },
  { code: "mr", name: "Marathi" },
  { code: "gu", name: "Gujarati" },
  { code: "kn", name: "Kannada" },
  { code: "te", name: "Telugu" },
  { code: "ml", name: "Malayalam" },
  { code: "ur", name: "Urdu" },
  { code: "am", name: "Amharic" },
  { code: "af", name: "Afrikaans" },
  { code: "fi", name: "Finnish" },
  { code: "no", name: "Norwegian" },
  { code: "da", name: "Danish" },
  { code: "bg", name: "Bulgarian" },
  { code: "sr", name: "Serbian" },
  { code: "hr", name: "Croatian" },
  { code: "sk", name: "Slovak" },
  { code: "sl", name: "Slovenian" },
  { code: "et", name: "Estonian" },
  { code: "lv", name: "Latvian" },
  { code: "lt", name: "Lithuanian" },
  { code: "is", name: "Icelandic" },
  { code: "mk", name: "Macedonian" },
  { code: "mt", name: "Maltese" },
  { code: "ka", name: "Georgian" },
  { code: "hy", name: "Armenian" },
  { code: "az", name: "Azerbaijani" },
  { code: "kk", name: "Kazakh" },
  { code: "uz", name: "Uzbek" },
  { code: "mn", name: "Mongolian" },
  { code: "tg", name: "Tajik" },
  { code: "ne", name: "Nepali" },
  { code: "si", name: "Sinhala" },
  { code: "pa", name: "Punjabi" },
  { code: "my", name: "Burmese" },
  { code: "km", name: "Khmer" },
  { code: "lo", name: "Lao" },
  { code: "jw", name: "Javanese" },
  { code: "su", name: "Sundanese" },
  { code: "fil", name: "Filipino" },
  { code: "sw", name: "Swahili" },
  { code: "yo", name: "Yoruba" },
  { code: "ig", name: "Igbo" },
  { code: "ha", name: "Hausa" },
  { code: "zu", name: "Zulu" },
  { code: "xh", name: "Xhosa" },
  { code: "st", name: "Sesotho" },
  { code: "ts", name: "Tsonga" },
  { code: "tn", name: "Tswana" },
  { code: "sn", name: "Shona" },
  { code: "so", name: "Somali" },
  { code: "ny", name: "Chichewa" },
  { code: "mg", name: "Malagasy" },
];

const LanguageSelector = ({ selectedLanguage, onSelectLanguage }) => {
  return (
    <div className="language-selector">
      <label htmlFor="language">Choose Language: </label>
      <select
        id="language"
        value={selectedLanguage}
        onChange={(e) => onSelectLanguage(e.target.value)}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;

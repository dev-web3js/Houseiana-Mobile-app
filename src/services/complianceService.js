import AsyncStorage from '@react-native-async-storage/async-storage';
import { REGIONS, PLATFORM } from '../shared/constants';
import { apiService } from './api';

class ComplianceService {
  constructor() {
    this.currentRegion = 'North America';
    this.complianceSettings = {};
    this.isInitialized = false;
  }

  /**
   * Initialize compliance service
   */
  async initialize(userRegion = null) {
    try {
      const region = userRegion || await AsyncStorage.getItem('user_region') || 'North America';
      this.currentRegion = region;
      
      await this.loadComplianceSettings(region);
      
      this.isInitialized = true;
      console.log(`⚖️ Compliance service initialized for: ${region}`);
    } catch (error) {
      console.error('Failed to initialize compliance service:', error);
    }
  }

  /**
   * Load compliance settings for specific region
   */
  async loadComplianceSettings(region) {
    try {
      const settings = this.getRegionalCompliance(region);
      this.complianceSettings = settings;
      
      // In production, would fetch from API/regulatory database
      // const response = await apiService.getComplianceSettings(region);
      // this.complianceSettings = response.data;
    } catch (error) {
      console.error(`Failed to load compliance settings for ${region}:`, error);
    }
  }

  /**
   * Get regional compliance requirements
   */
  getRegionalCompliance(region) {
    const compliance = {
      'North America': {
        // United States & Canada
        taxCompliance: {
          required: true,
          forms: ['W-9', '1099-MISC', 'T4A'],
          thresholds: {
            USD: 600, // IRS reporting threshold
            CAD: 500, // CRA reporting threshold
          },
          vatRegistration: false,
          salesTaxRequired: true,
        },
        kycRequirements: {
          individual: {
            idTypes: ['passport', 'drivers_license', 'national_id'],
            addressVerification: true,
            bankVerification: true,
          },
          business: {
            registrationDocs: true,
            taxId: true,
            beneficialOwnership: true,
          }
        },
        dataProtection: {
          framework: 'CCPA_PIPEDA',
          dataRetention: '7_years',
          rightToDelete: true,
          consentRequired: true,
        },
        paymentCompliance: {
          pciDssRequired: true,
          strongAuthentication: true,
          openBanking: false,
        },
        disputeResolution: {
          mandatoryArbitration: false,
          cooldownPeriod: '30_days',
          escalationProcess: true,
        }
      },

      'Europe': {
        // European Union
        taxCompliance: {
          required: true,
          forms: ['VAT_RETURN', 'INTRASTAT'],
          thresholds: {
            EUR: 10000, // EU reporting threshold
          },
          vatRegistration: true,
          vatRate: 'variable_by_country',
          mossRequired: true,
        },
        kycRequirements: {
          individual: {
            idTypes: ['passport', 'national_id', 'eu_id_card'],
            addressVerification: true,
            bankVerification: true,
            pep_screening: true,
          },
          business: {
            registrationDocs: true,
            vatNumber: true,
            beneficialOwnership: true,
            ultimateBeneficialOwner: true,
          }
        },
        dataProtection: {
          framework: 'GDPR',
          dataRetention: 'legitimate_interest_period',
          rightToDelete: true,
          rightToPortability: true,
          consentRequired: true,
          dataProcessingBasis: 'required',
        },
        paymentCompliance: {
          pciDssRequired: true,
          strongAuthentication: true,
          openBanking: true,
          psd2Compliance: true,
        },
        disputeResolution: {
          odrPlatform: true,
          cooldownPeriod: '14_days',
          escalationProcess: true,
        }
      },

      'Middle East': {
        // GCC Countries
        taxCompliance: {
          required: true,
          forms: ['VAT_RETURN', 'ECONOMIC_SUBSTANCE'],
          thresholds: {
            USD: 500, // Lower threshold for Middle East
          },
          vatRegistration: true,
          vatRate: 5, // Standard GCC VAT rate
          economicSubstance: true,
        },
        kycRequirements: {
          individual: {
            idTypes: ['passport', 'national_id', 'gcc_id'],
            addressVerification: true,
            bankVerification: true,
            sanctions_screening: true,
          },
          business: {
            registrationDocs: true,
            tradeLicense: true,
            beneficialOwnership: true,
            sanctions_screening: true,
          }
        },
        dataProtection: {
          framework: 'LOCAL_REGULATIONS',
          dataRetention: '5_years',
          dataLocalization: true,
          consentRequired: true,
        },
        paymentCompliance: {
          pciDssRequired: true,
          strongAuthentication: true,
          islamicBankingCompliance: true,
          localPaymentMethods: true,
        },
        disputeResolution: {
          shariaCompliance: true,
          cooldownPeriod: '30_days',
          localArbitration: true,
        }
      },

      'Asia Pacific': {
        // Australia, Japan, Singapore, etc.
        taxCompliance: {
          required: true,
          forms: ['GST_RETURN', 'ANNUAL_RETURN'],
          thresholds: {
            AUD: 75000, // GST registration threshold
            JPY: 10000000, // Consumption tax threshold
          },
          vatRegistration: true,
          gstRequired: true,
        },
        kycRequirements: {
          individual: {
            idTypes: ['passport', 'drivers_license', 'national_id'],
            addressVerification: true,
            bankVerification: true,
          },
          business: {
            registrationDocs: true,
            taxId: true,
            beneficialOwnership: true,
          }
        },
        dataProtection: {
          framework: 'PRIVACY_ACT_APPI',
          dataRetention: 'as_required',
          crossBorderRestrictions: true,
          consentRequired: true,
        },
        paymentCompliance: {
          pciDssRequired: true,
          strongAuthentication: true,
          localPaymentMethods: true,
        },
        disputeResolution: {
          cooldownPeriod: '30_days',
          escalationProcess: true,
          localRegulatorContact: true,
        }
      }
    };

    return compliance[region] || compliance['North America'];
  }

  /**
   * Check if user meets compliance requirements
   */
  async checkUserCompliance(userId) {
    try {
      const user = await apiService.getUser(userId);
      const compliance = this.complianceSettings;
      
      const results = {
        kyc: await this.checkKYCCompliance(user),
        tax: await this.checkTaxCompliance(user),
        dataProtection: await this.checkDataProtectionCompliance(user),
        payment: await this.checkPaymentCompliance(user),
      };

      return {
        isCompliant: Object.values(results).every(r => r.compliant),
        details: results,
        region: this.currentRegion,
      };
    } catch (error) {
      console.error('Compliance check failed:', error);
      return {
        isCompliant: false,
        error: error.message,
      };
    }
  }

  /**
   * Check KYC compliance
   */
  async checkKYCCompliance(user) {
    const requirements = this.complianceSettings.kycRequirements?.individual || {};
    
    const checks = {
      idVerification: user.kycStatus?.idVerified || false,
      addressVerification: user.kycStatus?.addressVerified || false,
      bankVerification: user.kycStatus?.bankVerified || false,
    };

    // Regional specific checks
    if (this.currentRegion === 'Europe' && requirements.pep_screening) {
      checks.pepScreening = user.kycStatus?.pepScreened || false;
    }

    if (this.currentRegion === 'Middle East' && requirements.sanctions_screening) {
      checks.sanctionsScreening = user.kycStatus?.sanctionsScreened || false;
    }

    const compliant = Object.values(checks).every(Boolean);

    return {
      compliant,
      checks,
      missingRequirements: Object.keys(checks).filter(key => !checks[key]),
    };
  }

  /**
   * Check tax compliance
   */
  async checkTaxCompliance(user) {
    const requirements = this.complianceSettings.taxCompliance || {};
    
    const checks = {
      taxIdProvided: user.taxInfo?.taxId || false,
      formsSubmitted: user.taxInfo?.formsCompleted || false,
      thresholdCheck: true, // Would check against actual earnings
    };

    // Regional specific checks
    if (this.currentRegion === 'Europe' && requirements.vatRegistration) {
      checks.vatRegistration = user.taxInfo?.vatNumber || false;
    }

    if (this.currentRegion === 'Middle East' && requirements.economicSubstance) {
      checks.economicSubstance = user.taxInfo?.economicSubstanceCompliant || false;
    }

    const compliant = Object.values(checks).every(Boolean);

    return {
      compliant,
      checks,
      missingRequirements: Object.keys(checks).filter(key => !checks[key]),
    };
  }

  /**
   * Check data protection compliance
   */
  async checkDataProtectionCompliance(user) {
    const requirements = this.complianceSettings.dataProtection || {};
    
    const checks = {
      consentGiven: user.privacy?.consentGiven || false,
      dataProcessingAgreed: user.privacy?.dataProcessingAgreed || false,
    };

    // GDPR specific checks
    if (this.currentRegion === 'Europe') {
      checks.gdprConsentGiven = user.privacy?.gdprConsentGiven || false;
      checks.dataProcessingBasisDefined = user.privacy?.processingBasis || false;
    }

    const compliant = Object.values(checks).every(Boolean);

    return {
      compliant,
      checks,
      missingRequirements: Object.keys(checks).filter(key => !checks[key]),
    };
  }

  /**
   * Check payment compliance
   */
  async checkPaymentCompliance(user) {
    const requirements = this.complianceSettings.paymentCompliance || {};
    
    const checks = {
      strongAuthenticationEnabled: user.security?.twoFactorEnabled || false,
      paymentMethodVerified: user.paymentMethods?.some(pm => pm.verified) || false,
    };

    // Regional specific checks
    if (this.currentRegion === 'Europe' && requirements.psd2Compliance) {
      checks.psd2Compliant = user.paymentMethods?.some(pm => pm.psd2Compliant) || false;
    }

    if (this.currentRegion === 'Middle East' && requirements.islamicBankingCompliance) {
      checks.shariaCompliant = user.preferences?.shariaCompliant || false;
    }

    const compliant = Object.values(checks).every(Boolean);

    return {
      compliant,
      checks,
      missingRequirements: Object.keys(checks).filter(key => !checks[key]),
    };
  }

  /**
   * Get required compliance actions
   */
  getRequiredActions(complianceResult) {
    const actions = [];

    if (!complianceResult.isCompliant) {
      const { details } = complianceResult;

      // KYC actions
      if (!details.kyc?.compliant) {
        details.kyc.missingRequirements?.forEach(req => {
          actions.push({
            type: 'kyc',
            action: req,
            priority: 'high',
            description: this.getActionDescription('kyc', req),
          });
        });
      }

      // Tax actions
      if (!details.tax?.compliant) {
        details.tax.missingRequirements?.forEach(req => {
          actions.push({
            type: 'tax',
            action: req,
            priority: 'medium',
            description: this.getActionDescription('tax', req),
          });
        });
      }

      // Data protection actions
      if (!details.dataProtection?.compliant) {
        details.dataProtection.missingRequirements?.forEach(req => {
          actions.push({
            type: 'privacy',
            action: req,
            priority: 'high',
            description: this.getActionDescription('privacy', req),
          });
        });
      }

      // Payment actions
      if (!details.payment?.compliant) {
        details.payment.missingRequirements?.forEach(req => {
          actions.push({
            type: 'payment',
            action: req,
            priority: 'medium',
            description: this.getActionDescription('payment', req),
          });
        });
      }
    }

    return actions;
  }

  /**
   * Get action descriptions
   */
  getActionDescription(type, action) {
    const descriptions = {
      kyc: {
        idVerification: 'Complete identity verification by uploading a valid ID document',
        addressVerification: 'Verify your address with a utility bill or bank statement',
        bankVerification: 'Verify your bank account details',
        pepScreening: 'Complete Politically Exposed Person screening',
        sanctionsScreening: 'Complete sanctions list screening',
      },
      tax: {
        taxIdProvided: 'Provide your tax identification number',
        formsSubmitted: 'Complete required tax forms',
        vatRegistration: 'Register for VAT if required',
        economicSubstance: 'Meet economic substance requirements',
      },
      privacy: {
        consentGiven: 'Provide consent for data processing',
        dataProcessingAgreed: 'Agree to data processing terms',
        gdprConsentGiven: 'Provide GDPR-compliant consent',
        dataProcessingBasisDefined: 'Define legal basis for data processing',
      },
      payment: {
        strongAuthenticationEnabled: 'Enable two-factor authentication',
        paymentMethodVerified: 'Verify at least one payment method',
        psd2Compliant: 'Use PSD2-compliant payment methods',
        shariaCompliant: 'Enable Sharia-compliant payment options',
      },
    };

    return descriptions[type]?.[action] || `Complete ${action}`;
  }

  /**
   * Get regional tax information
   */
  getRegionalTaxInfo(region = null) {
    const targetRegion = region || this.currentRegion;
    const compliance = this.getRegionalCompliance(targetRegion);
    
    return {
      region: targetRegion,
      taxCompliance: compliance.taxCompliance,
      forms: compliance.taxCompliance?.forms || [],
      thresholds: compliance.taxCompliance?.thresholds || {},
      vatRequired: compliance.taxCompliance?.vatRegistration || false,
    };
  }

  /**
   * Change region and update compliance
   */
  async changeRegion(newRegion) {
    try {
      await this.loadComplianceSettings(newRegion);
      this.currentRegion = newRegion;
      await AsyncStorage.setItem('user_region', newRegion);
      
      console.log(`⚖️ Compliance region changed to: ${newRegion}`);
    } catch (error) {
      console.error('Failed to change compliance region:', error);
    }
  }

  /**
   * Get compliance status
   */
  getStatus() {
    return {
      isInitialized: this.isInitialized,
      currentRegion: this.currentRegion,
      hasSettings: Object.keys(this.complianceSettings).length > 0,
    };
  }
}

// Export singleton instance
export const complianceService = new ComplianceService();

// Helper hooks for React components
export const useCompliance = () => {
  return {
    checkCompliance: complianceService.checkUserCompliance.bind(complianceService),
    getRequiredActions: complianceService.getRequiredActions.bind(complianceService),
    getTaxInfo: complianceService.getRegionalTaxInfo.bind(complianceService),
    changeRegion: complianceService.changeRegion.bind(complianceService),
    currentRegion: complianceService.currentRegion,
    isInitialized: complianceService.isInitialized,
  };
};

export default complianceService;
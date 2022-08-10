import Settings, { SettingsInput } from '@models/setting.model';

class ClsConfig {
  private static settings: SettingsInput[] = [
    {
      id: 1,
      key: 'photo_process',
      value: '',
    },
  ];

  static async initConfig() {
    await Settings.create(ClsConfig.settings[0]);
  }
}

export default ClsConfig;

# LuCI Alpha Theme
# Copyright 2024 derisamedia <yuimizuno86@gmail.com>
#
# Licensed under the Apache License v2.0
# http://www.apache.org/licenses/LICENSE-2.0

include $(TOPDIR)/rules.mk

THEME_NAME:=alpha
THEME_TITLE:=Alpha

PKG_NAME:=luci-theme-$(THEME_NAME)
PKG_VERSION:=3.9.7_beta2
PKG_RELEASE:=12

include $(INCLUDE_DIR)/package.mk

define Package/luci-theme-$(THEME_NAME)
  SECTION:=luci
  CATEGORY:=LuCI
  SUBMENU:=9. Themes
  DEPENDS:=+libc +luci-app-alpha-config
  TITLE:=LuCi Theme For OpenWrt And Alpha OS ONLY - $(THEME_TITLE)
  URL:=http://facebook.com/derisamedia/
  PKGARCH:=all
endef

define Build/Configure
endef

define Build/Compile
endef

define Package/luci-theme-$(THEME_NAME)/install
	$(INSTALL_DIR) $(1)/etc/uci-defaults
	echo "uci set luci.themes.$(THEME_TITLE)=/luci-static/$(THEME_NAME); uci commit luci" > $(1)/etc/uci-defaults/30-luci-theme-$(THEME_NAME)
	$(INSTALL_DIR) $(1)/www/luci-static/$(THEME_NAME)
	$(CP) ./luasrc/. $(1)/www/luci-static/$(THEME_NAME)/
	
	# Install templates for Lua based LuCI, including LEDE r24.10
	$(INSTALL_DIR) $(1)/usr/lib/lua/luci/view/themes/$(THEME_NAME)
	$(CP) ./template/*.htm $(1)/usr/lib/lua/luci/view/themes/$(THEME_NAME)/
	
	# Install templates for ucode based LuCI
	$(INSTALL_DIR) $(1)/usr/share/ucode/luci/template/themes/$(THEME_NAME)
	$(CP) ./template/*.ut $(1)/usr/share/ucode/luci/template/themes/$(THEME_NAME)/
	
	$(INSTALL_DIR) $(1)/www/luci-static/resources
	$(CP) ./js/. $(1)/www/luci-static/resources/
	$(INSTALL_DIR) $(1)/etc/config
	$(CP) ./root/etc/config/. $(1)/etc/config/
endef

define Package/luci-theme-$(THEME_NAME)/postinst
#!/bin/sh
if [ -z "$${IPKG_INSTROOT}" ]; then
	if [ -f /etc/uci-defaults/30-luci-theme-$(THEME_NAME) ]; then
		. /etc/uci-defaults/30-luci-theme-$(THEME_NAME)
		rm -f /etc/uci-defaults/30-luci-theme-$(THEME_NAME)
	fi
fi
exit 0
endef
$(eval $(call PackageDir,luci-theme-$(THEME_NAME),luci-theme-$(THEME_NAME),))
$(eval $(call BuildPackage,luci-theme-$(THEME_NAME)))
